import { Component, OnInit, Inject } from '@angular/core';
import {ToolModel} from "../model/tool.model";
import { map } from 'rxjs/operators';
import {FormControl} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";




@Component({
  selector: 'app-view-tool',
  templateUrl: './view-tool.component.html',
  styleUrls: ['./view-tool.component.css']
})
export class ViewToolComponent implements OnInit {
  visible = true;
  toolCtrl = new FormControl();
  tool: ToolModel;
  comment: string | null;
  dataSource = [
    {comment: "This is awesome"},
    {comment: "So well done"}
  ]
  constructor(@Inject(MAT_DIALOG_DATA) selectedTool : ToolModel) {
    this.tool = selectedTool
    this.comment = null
    console.log(this.tool.tags)
  }

  ngOnInit(): void {
  }

  addComment(): void {
      if (this.comment != null) {
        this.dataSource.push({comment: this.comment});
      }
      this.comment = null;
      console.log(this.dataSource)
  }

}
