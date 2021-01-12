import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationsService } from 'src/app/services/notifications.service';
import { ValidationForms } from 'src/app/utils/validations-forms';

@Component({
  selector: 'app-main-notifications',
  templateUrl: './main-notifications.component.html',
  styleUrls: ['./main-notifications.component.scss']
})
export class MainNotificationsComponent extends ValidationForms implements OnInit {

  notificationForm: FormGroup;
  loadingSend;

  constructor(private fb: FormBuilder,
     private notificationsService: NotificationsService, private snackBar: MatSnackBar) { super() }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.notificationForm = this.fb.group({
      title: [null, Validators.required],
      body: [null, Validators.required],
      type: ['1', Validators.required],
    })
  }

  async sendNotifications() {
    if (this.notificationForm.invalid) {
      alert('Formulario incompleto');
      return;
    }
    const confirmationAction = await this.showMessageConfirm("Enviar la notificación");

    if (!confirmationAction.value) return;

    this.loadingSend = true;
    this.notificationsService.sendNotifications(this.notificationForm.value)
    .subscribe((data: any) => {
      this.loadingSend = false;
      this.notificationForm.reset();
      this.snackBar.open('Notificación enviada correctamente', '', {
        duration: 3000
      });
    }, error => {
      this.loadingSend = false;
      alert('Ha ocurrido un error al mandar la notificación');
    });

  }

}
