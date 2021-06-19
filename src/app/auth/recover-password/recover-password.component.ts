import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as common_functions from 'src/app/utils/functions';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ValidationForms } from 'src/app/utils/validations-forms';
import { GlobalValidator } from 'src/app/utils/validators';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent extends ValidationForms implements OnInit {
  year = new Date().getFullYear();
  recoverForm: FormGroup;
  loadingRecover: boolean;
  success: boolean;
  fieldType = 'password';
  fieldType2 = 'password';
  token;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute) {
    super();
    // ======= GET PARAMS { TOKEN } ========
    this.activatedRoute.queryParams
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
    this.authService.recoverPassword(this.token, password)
      .subscribe(data => {
        this.loadingRecover = false;
        this.success = true;
        this.showSwalMessage('Vuelve a iniciar sesión con tu nueva contraseña');
      }, error => {
        this.loadingRecover = false;
        this.showSwalMessage(error.errors.message, 'error');
      });
  }

  buildRecoverForm() {
    this.recoverForm = this.fb.group({
      password: [null, [Validators.required, GlobalValidator.passwordFormat, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required, GlobalValidator.passwordFormat, Validators.minLength(8)]],
    }, { validators: GlobalValidator.confirmPassword });
  }
}
