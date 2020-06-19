import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as common_functions from 'src/app/utils/functions';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {

  recoverForm: FormGroup;
  token: string;
  loadingRecover: boolean;

  constructor(private fb: FormBuilder, private alertService: AlertsService,
              private authService: AuthService, private activatedRoute: ActivatedRoute) {

    // ======= GET PARAMS {TOKEN} ========

    activatedRoute.queryParams
      .subscribe(params => {
        this.token = params.token;
      });
  }

  ngOnInit(): void {
    this.buildRecoverForm();
  }

  recoverPassword() {

    if (this.recoverForm.invalid) {
      common_functions.markAsTouched(this.recoverForm);
      return;
    }
    this.loadingRecover = true;

    const password = this.recoverForm.get('password').value;
    const message = `Vuelve a iniciar sesiñon con tu nueva contraseña`;

    this.authService.recoverPassword(this.token, password)
      .subscribe(data => {

        this.alertService.openSuccessDialog('/auth/', 'Se ha guardado la contraseña', message);
        this.loadingRecover = false;

      }, error => {

        this.loadingRecover = false;
        this.alertService.openErrorDialog(null, 'Opps..', error.errors.message);

      });
  }

  buildRecoverForm() {
    this.recoverForm = this.fb.group({
      password: [null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, Validators.required]
    }, { validators: common_functions.globalValidator.confirmPassword });
  }

  isFieldInvalid(form: FormGroup, field: string) {
    return (
      (!form.get(field).valid && form.get(field).touched)
    );
  }

  isFieldValid(form: FormGroup, field: string) {
    return (
      (form.get(field).valid && form.get(field).touched)
    );
  }

  isFieldHasError(form: FormGroup, field: string, error: string) {
    return (
      (form.get(field).hasError(error))
    );
  }

}
