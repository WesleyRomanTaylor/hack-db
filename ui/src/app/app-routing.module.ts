import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToolTableComponent } from './tool-table/tool-table.component';
import {NewToolDialogComponent} from "./new-tool-dialog/new-tool-dialog.component";

const routes: Routes = [
  { path: '', component: ToolTableComponent },
  { path: 'new', component: NewToolDialogComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
