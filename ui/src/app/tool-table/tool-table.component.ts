import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewToolComponent } from '../view-tool/view-tool.component';
import {ToolModel} from "../model/tool.model";

const ELEMENT_DATA: ToolModel[] = [
  {id: "1", tags: ["bash", "kubernetes"], vote_count: 10, broken_count: 0, description: "This is a description", created_by: "User 1", title: "Cool bash command", content: "$ kubectl -n test get po"},
  {id: "2", tags: ["bash"], vote_count: 5, broken_count: 1, description: "This is a description", created_by: "User 1", title: "Cool bash command", content: "$ kubectl -n test get po"},
];

@Component({
  selector: 'app-tool-table',
  templateUrl: './tool-table.component.html',
  styleUrls: ['./tool-table.component.css']
})
export class ToolTableComponent implements OnInit {
  displayedColumns: string[] = ['title', 'tags', 'created_by', 'vote_count', 'broken_count', 'view'];
  dataSource = ELEMENT_DATA;
  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openDialog(element: ToolModel): void {
    console.log(element);
    const dialogRef = this.dialog.open(ViewToolComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
