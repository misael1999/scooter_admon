import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-confirm-signup-dialog',
  templateUrl: './confirm-signup-dialog.component.html',
  styleUrls: ['./confirm-signup-dialog.component.scss']
})
export class ConfirmSignupDialogComponent implements OnInit {

  title = '';
  message = '';

  constructor(public dialogRef: MatDialogRef<ConfirmSignupDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    this.title = data.title;
    this.message = data.message;

  }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
