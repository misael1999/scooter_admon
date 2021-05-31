import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthService } from 'src/app/services/auth.service';
import * as commons_functions from 'src/app/utils/functions';
import { ValidationForms } from 'src/app/utils/validations-forms';
import { GlobalValidator } from 'src/app/utils/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends ValidationForms implements OnInit {
  fecha = new Date().getFullYear();
  loginForm: FormGroup;
  loadingLogin = false;

  constructor(
    private authService: AuthService,
    private alertService: AlertsService,
    private fb: FormBuilder,
    private router: Router) {
    super();
  }

  ngOnInit() {
    this.buildLoginForm();
    this.fecha;
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
        this.router.navigate(['/dashboard']);
      }, error => {
        this.loadingLogin = false;
        this.alertService.openErrorDialog(null, 'Opss..', error.errors.message);
      });
  }

  setDataUserLocalStorage(data) {
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('station_id', data.station.id);
    localStorage.setItem('refresh_token', data.refresh);
    localStorage.setItem('information_is_complete', data.station.information_is_complete);
    localStorage.setItem('station', JSON.stringify(data.station));
  }

  // buildLoginForm() {
  //   this.loginForm = this.fb.group({
  //     username: [null, [Validators.required, GlobalValidator.mailFormat]],
  //     password: [null, [Validators.required, Validators.minLength(8), GlobalValidator.passwordFormat]]
  //   });
  // }
  buildLoginForm() {
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }
}