import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import * as commons_functions from 'src/app/utils/functions';
import { AlertsService } from 'src/app/services/alerts.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  signupForm: FormGroup;
  loadingSave = false;

  constructor(private authService: AuthService,
              private fb: FormBuilder, private alertService: AlertsService) { }

  ngOnInit(): void {
    this.buildSignupForm();
  }

  signup() {

    if (this.signupForm.invalid) {
      commons_functions.markAsTouched(this.signupForm);
      return;
    }

    const title = 'Gracias por registrarse, por favor verifique su cuenta';
    const message = `En breve recibira un correo electronico
     a ${this.signupForm.get('username').value} para confirmar su cuenta`;

    this.loadingSave = true;

    this.authService.signup(this.signupForm.value)
      .subscribe(data => {
        this.loadingSave = true;
        this.alertService.openAlertConfirmSignup('/auth/', title, message);
      }, error => {
        this.loadingSave = false;
        this.alertService.openErrorDialog(null, 'Oppss..', error.errors.message);
      });

  }

  buildSignupForm() {
    this.signupForm = this.fb.group({
      station_name: [null, commons_functions.globalValid],
      contact_person: [null, commons_functions.globalValid],
      username: [null, commons_functions.globalValidEmail],
      password: [null, commons_functions.globalValid],
      confirmPassword: [null, commons_functions.globalValid],
    }, { validators: commons_functions.globalValidator.confirmPassword });
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

