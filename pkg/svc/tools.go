package svc

import (
	"context"
	"errors"
	"fmt"
	"github.com/brocwoodworthIBLX/hack-db/pkg/pb"
	tkgorm "github.com/infobloxopen/atlas-app-toolkit/gorm"
)

type ToolsCustomServer struct {
	pb.ToolsDefaultServer
}

func (scs ToolsCustomServer) Update(ctx context.Context, req *pb.UpdateToolRequest) (*pb.UpdateToolResponse, error) {
	if req.Payload == nil {
		return nil, errors.New("Payload cannot be nil")
	}
	txn, err := tkgorm.BeginFromContext(ctx)
	if err != nil {
		return nil, err
	}

	if req.GetPayload().GetCreatedBy() != "" {
		return nil, fmt.Errorf("\"Created_By\" field may not be modified")
	}

	res, err := pb.DefaultStrictUpdateTool(ctx, req.GetPayload(), txn)
	if err != nil {
		return nil, err
	}
	return &pb.UpdateToolResponse{Result: res}, nil
}
