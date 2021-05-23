import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {TagModel} from "../model/tag.model";
import {ToolService} from "../service/tool.service";

@Component({
  selector: 'app-new-tool-dialog',
  templateUrl: './new-tool-dialog.component.html',
  styleUrls: ['./new-tool-dialog.component.css']
})
export class NewToolDialogComponent implements OnInit {
  title: string = '';
  desc: string = '';
  content: string = ''


  constructor(public router: Router, public toolService: ToolService) { }

  ngOnInit(): void {
  }

  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  save(): void {
    this.toolService.saveTool(
      {
        title: this.title,
        tool_code: this.content,
        description: this.desc,
        created_by: 'User1',
        tags: this.tags
      }
    )
      .subscribe(() => {
        this.router.navigateByUrl('/');
      });
  }

  cancel(): void {
    this.router.navigateByUrl('/');
  }
}
