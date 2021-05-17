package main

import (
	"context"
	"io/ioutil"
	"time"

	"github.com/brocwoodworthIBLX/hack-db/pkg/pb"
	"github.com/brocwoodworthIBLX/hack-db/pkg/svc"

	"github.com/infobloxopen/atlas-app-toolkit/gateway"
	tkgorm "github.com/infobloxopen/atlas-app-toolkit/gorm"
	"github.com/infobloxopen/atlas-app-toolkit/requestid"

	grpc_middleware "github.com/grpc-ecosystem/go-grpc-middleware"
	grpc_logrus "github.com/grpc-ecosystem/go-grpc-middleware/logging/logrus"
	"github.com/grpc-ecosystem/go-grpc-middleware/logging/logrus/ctxlogrus"
	grpc_validator "github.com/grpc-ecosystem/go-grpc-middleware/validator"
	grpc_prometheus "github.com/grpc-ecosystem/go-grpc-prometheus"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
	"google.golang.org/grpc"
	"google.golang.org/grpc/keepalive"
)

func NewGRPCServer(logger *logrus.Logger, dbConnectionString string) (*grpc.Server, error) {
	// create new postgres database
	db, err := gorm.Open("postgres", dbConnectionString)
	if err != nil {
		return nil, err
	}

	interceptors := []grpc.UnaryServerInterceptor{
		grpc_middleware.ChainUnaryServer(
			// logging middleware
			grpc_logrus.UnaryServerInterceptor(logrus.NewEntry(logger)),

			// Request-Id interceptor
			requestid.UnaryServerInterceptor(),

			// Metrics middleware
			grpc_prometheus.UnaryServerInterceptor,

			// validation middleware
			grpc_validator.UnaryServerInterceptor(),

			// collection operators middleware
			gateway.UnaryServerInterceptor(),
		),
		dbLoggingWrapper(db),
	}

	grpcServer := grpc.NewServer(
		grpc.KeepaliveParams(
			keepalive.ServerParameters{
				Time:    time.Duration(viper.GetInt("config.keepalive.time")) * time.Second,
				Timeout: time.Duration(viper.GetInt("config.keepalive.timeout")) * time.Second,
			},
		),
		grpc.UnaryInterceptor(grpc_middleware.ChainUnaryServer(interceptors...)))

	pb.RegisterSubmissionsServer(grpcServer, &svc.SubmissionsCustomServer{})

	return grpcServer, nil
}

// creates a per-request copy of the DB with db logging set using the context logger
func dbLoggingWrapper(db *gorm.DB) grpc.UnaryServerInterceptor {
	return func(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {
		logEntry := ctxlogrus.Extract(ctx)
		// Do nothing if no logger was found in the context
		if logEntry.Logger.Out != ioutil.Discard && viper.GetBool("database.logging") {
			db = db.New()
			db.SetLogger(logEntry)
			db.LogMode(true)
		}
		return tkgorm.UnaryServerInterceptor(db)(ctx, req, info, handler)
	}
}
