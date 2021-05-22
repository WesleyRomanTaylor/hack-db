import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewToolDialogComponent } from './new-tool-dialog/new-tool-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bash-share';

  constructor(
    public dialog: MatDialog,
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(NewToolDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
