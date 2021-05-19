import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToolTableComponent } from './tool-table/tool-table.component';

const routes: Routes = [
  { path: '', component: ToolTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
