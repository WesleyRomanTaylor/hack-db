import { Component, OnInit, Inject } from '@angular/core';
import {ToolModel} from "../model/tool.model";
import { map } from 'rxjs/operators';
import {FormControl} from "@angular/forms";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ToolService} from "../service/tool.service";
import {CommentService} from "../service/comment.service";




@Component({
  selector: 'app-view-tool',
  templateUrl: './view-tool.component.html',
  styleUrls: ['./view-tool.component.css']
})
export class ViewToolComponent implements OnInit {
  visible = true;
  toolCtrl = new FormControl();
  tool: ToolModel;
  comment: string;
  dataSource: any = []
  constructor(@Inject(MAT_DIALOG_DATA) selectedTool : ToolModel, public commentService: CommentService) {
    this.tool = selectedTool
    this.comment = '';
    console.log(this.tool.tags)
  }

  ngOnInit(): void {
    if(this.tool.id) {
      this.commentService.getComments(this.tool.id)
        .subscribe(data => {
          this.dataSource = data;
        });
    }
  }

  addComment(): void {
      if (this.comment.length > 0 && this.tool.id) {
        this.dataSource.push({comment: this.comment});
        this.commentService.addComment(this.tool.id, this.comment, "person")
      }
      this.comment = '';
      console.log(this.dataSource)
  }

}
