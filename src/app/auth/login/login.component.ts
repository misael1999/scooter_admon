import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as commons_functions from 'src/app/utils/functions';
import { AlertsService } from 'src/app/services/alerts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loadingLogin = false;

  constructor(private authService: AuthService, private alertService: AlertsService,
              private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.buildLoginForm();
  }

  login() {
    if (this.loginForm.invalid) {
      commons_functions.markAsTouched(this.loginForm);
      return;
    }

    this.loadingLogin = true;

    const user = this.loginForm.value;
    this.authService.login(user)
      .subscribe((data: any) => {
        this.loadingLogin = false;
        this.setDataUserLocalStorage(data);
        this.router.navigate(['/complete-profile']);

      }, error => {
        this.loadingLogin = false;
        this.alertService.openErrorDialog(null, 'Oppss..', error.errors.message);
      });

  }

  setDataUserLocalStorage(data) {
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    localStorage.setItem('station', JSON.stringify(data.station));
  }

  buildLoginForm() {
    this.loginForm = this.fb.group({
      username: [null, commons_functions.globalValidEmail],
      password: [null, Validators.required]
    });
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
