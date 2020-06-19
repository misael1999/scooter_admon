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
     a ${this.signupForm.get('email').value} para confirmar su cuenta`;

    this.loadingSave = true;

    this.authService.signup(this.signupForm.value)
      .subscribe(data => {
        this.loadingSave = true;
        this.alertService.openAlertConfirmSignup('/auth/', title, message);
      }, error => {
        this.loadingSave = false;
      });

  }

  buildSignupForm() {
    this.signupForm = this.fb.group({
      contact_person_name: [null, commons_functions.globalValid],
      contact_person_last_name: [null, commons_functions.globalValid],
      email: [null, commons_functions.globalValidEmail],
      phone_number: [null, commons_functions.globalValid],
      password: [null, commons_functions.globalValid],
      confirmPassword: [null, commons_functions.globalValid],
      business_name: [null, commons_functions.globalValid]
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

