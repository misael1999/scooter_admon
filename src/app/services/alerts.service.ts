import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmSignupDialogComponent } from '../shared/alerts/confirm-signup-dialog/confirm-signup-dialog.component';
import { Router } from '@angular/router';
import { ErrorDialogComponent } from '../shared/alerts/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../shared/alerts/success-dialog/success-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private dialog: MatDialog, private router: Router) { }

  openAlertConfirmSignup(path = null, title = '', message = '', params = {}) {
    const dialogref = this.dialog.open(ConfirmSignupDialogComponent, {
      disableClose: true,
      width: '40%',
      minWidth: '350px',
      data: {title, message}
    });

    dialogref.afterClosed().subscribe(data => {
      if (path) {
        this.router.navigate([path]);
      }
    });

  }

  openErrorDialog(path = null, title = '', message = '', params = {}) {
    const dialogref = this.dialog.open(ErrorDialogComponent, {
      disableClose: true,
      width: '35%',
      minWidth: '350px',
      data: {title, message}
    });

    dialogref.afterClosed().subscribe(data => {
      if (path) {
        this.router.navigate([path]);
      }
    });

  }

  openSuccessDialog(path = null, title = '', message = '', params = {}) {
    const dialogref = this.dialog.open(SuccessDialogComponent, {
      disableClose: true,
      width: '35%',
      minWidth: '350px',
      data: {title, message}
    });

    dialogref.afterClosed().subscribe(data => {
      if (path) {
        this.router.navigate([path]);
      }
    });

  }

}
