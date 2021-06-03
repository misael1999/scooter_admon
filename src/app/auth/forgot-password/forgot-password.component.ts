import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as common_functions from 'src/app/utils/functions';
import { AuthService } from 'src/app/services/auth.service';
import { AlertsService } from 'src/app/services/alerts.service';
import { ValidationForms } from 'src/app/utils/validations-forms';
import { GlobalValidator } from 'src/app/utils/validators';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent extends ValidationForms implements OnInit {
  year = new Date().getFullYear();
  forgotForm: FormGroup;
  loadingForgot: boolean;

  // When request is success
  success: boolean;
  message = 'Se ha enviado un correo a darka99_19@hotmail.com para continuar con el proceso de recuperado de contraseña';
  title = 'Solicitud exitosa';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertService: AlertsService) {
    super()
  }

  ngOnInit(): void {
    this.buildForgotForm();
  }

  sendEmail() {
    if (this.forgotForm.invalid) {
      common_functions.markAsTouched(this.forgotForm);
      return;
    }

    this.loadingForgot = true;
    const email = this.forgotForm.get('username').value;
    this.message = `Se ha enviado un correo a ${email}
     para continuar con el proceso de recuperado de contraseña `;

    this.authService.forgotPassword(email)
      .subscribe(data => {
        this.loadingForgot = false;
        this.success = true;
        // this.alertService.openAlertConfirmSignup(null, 'Solicitud existosa', message);
      }, error => {
        this.loadingForgot = false;
        this.showSwalMessage(error.errors.message, 'error')
      });
  }

  buildForgotForm() {
    this.forgotForm = this.fb.group({
      username: [null, [Validators.required, GlobalValidator.mailFormat]]
    });
  }
}
