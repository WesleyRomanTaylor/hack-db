package svc

import (
	"context"
	"errors"
	"fmt"
	"github.com/brocwoodworthIBLX/hack-db/pkg/pb"
	tkgorm "github.com/infobloxopen/atlas-app-toolkit/gorm"
)

type SubmissionsCustomServer struct {
	pb.SubmissionsDefaultServer
}

func (scs SubmissionsCustomServer) Update(ctx context.Context, req *pb.UpdateSubmissionRequest) (*pb.UpdateSubmissionResponse, error) {
	if req.Payload == nil {
		return nil, errors.New("Payload cannot be nil")
	}
	txn, err := tkgorm.BeginFromContext(ctx)
	if err != nil {
		return nil, err
	}

	if req.GetPayload().GetSubmission() != "" || req.GetPayload().GetSubmittedBy() != "" || req.GetPayload().GetTitle() != "" {
		return nil, fmt.Errorf("Only tags and votes may be modified")
	}

	res, err := pb.DefaultStrictUpdateSubmission(ctx, req.GetPayload(), txn)
	if err != nil {
		return nil, err
	}
	return &pb.UpdateSubmissionResponse{Result: res}, nil
}
