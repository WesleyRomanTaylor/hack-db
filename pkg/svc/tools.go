package svc

import (
	"context"
	"errors"
	"fmt"
	"github.com/brocwoodworthIBLX/hack-db/pkg/pb"
	tkgorm "github.com/infobloxopen/atlas-app-toolkit/gorm"
	"strings"
)

type ToolsCustomServer struct {
	pb.ToolsDefaultServer
}

func (tcs ToolsCustomServer) Update(ctx context.Context, req *pb.UpdateToolRequest) (*pb.UpdateToolResponse, error) {
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

func (tcs ToolsCustomServer) List(ctx context.Context, req *pb.ListToolRequest) (*pb.ListToolResponse, error) {
	txn, err := tkgorm.BeginFromContext(ctx)
	if err != nil {
		return nil, err
	}

	// Pagination
	txn = tkgorm.ApplyPagination(ctx, txn, req.GetPaging())

	// Filtering
	filterStr, _, _, err := tkgorm.FilteringToGorm(ctx, req.GetFilter(), &pb.ToolORM{}, &pb.Tool{})
	if err != nil {
		return nil, err
	}

	// ORDER BY
	trs := []string{}
	for _, sc := range req.GetOrderBy().GetCriterias() {
		var dbName string
		var err error
		fpath := strings.Split(strings.ToLower(sc.GetTag()), ".")
		typeDummy := &pb.ToolORM{}
		if tkgorm.IsJSONCondition(ctx, fpath, typeDummy) {
			dbName, _, err = tkgorm.HandleJSONFieldPath(ctx, fpath, typeDummy, "")
		} else {
			dbName, _, err = tkgorm.HandleFieldPath(ctx, fpath, typeDummy)
		}
		if err != nil {
			return nil, err
		}

		if sc.IsDesc() {
			dbName = dbName + ` desc`
		}
		trs = append(trs, dbName)
	}
	trs = append(trs, "tools.id")
	orderStr := fmt.Sprintf("ORDER BY %s", strings.Join(trs, ", "))

	// Get all tools, with empty tag field
	if len(filterStr) > 0 {
		filterStr = fmt.Sprintf("WHERE %s", filterStr)
	}
	rows, err := txn.Raw(fmt.Sprintf(`SELECT * from tools %s %s`, filterStr, orderStr)).Rows()
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	toolSlice := []*pb.Tool{}
	for rows.Next() {
		toolORM := &pb.ToolORM{}
		if err := txn.ScanRows(rows, toolORM); err != nil {
			return nil, err
		}
		t, err := toolORM.ToPB(ctx)
		if err != nil {
			return nil, err
		}
		toolSlice = append(toolSlice, &t)
	}

	returnSlice := []*pb.Tool{}
	// Populate tags[] field for each tool
	for _, tool := range toolSlice {
		var t = tool
		tagRows, err := txn.Raw(fmt.Sprintf(`SELECT name from tags WHERE '%s'=ANY(tool_id)`, tool.GetId().GetValue())).Rows()
		if err != nil {
			return nil, err
		}
		defer tagRows.Close()
		tagSlice := []string{}
		for tagRows.Next() {
			var tag string
			if err := txn.ScanRows(tagRows, tag); err != nil {
				return nil, err
			}
			tagSlice = append(tagSlice, tag)
		}
		t.Tags = tagSlice
		returnSlice = append(returnSlice, t)
	}

	return &pb.ListToolResponse{Results: returnSlice}, nil
}