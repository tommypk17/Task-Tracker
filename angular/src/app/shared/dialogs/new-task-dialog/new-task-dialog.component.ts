import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-new-task-dialog',
  templateUrl: './new-task-dialog.component.html',
  styleUrls: ['./new-task-dialog.component.scss']
})
export class NewTaskDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<NewTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
interface DialogData {
  title: string;
  subtitle: string;
  content: string;
  date: string;
}
