import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import * as CONSTANTS from 'src/app/utils/constants';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})

export class RefreshTokenGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(): Promise<boolean> | boolean {

    const token = localStorage.getItem('access_token');
    const refreshTokenLocal = localStorage.getItem('refresh_token');
    const payload = JSON.parse(atob(token.split('.')[1]));

    const expired = this.expired(payload.exp);

    if (expired) {
/*       Swal.fire({
        title: 'Sesión expirada',
        text: 'Por su seguridad debe de volver a iniciar sesión',
        type: 'info',
      }); */

      this.authService.logout();
      return false;

    }

    return this.refreshToken(payload.exp, refreshTokenLocal);
  }


  // tslint:disable-next-line:variable-name
  refreshToken(expirationDate: number, refresh_token): Promise<boolean> {

    return new Promise((resolve, reject) => {

      const tokenExp = new Date(expirationDate * 1000);
      const now = new Date();

      // LE SUMAMOS LAS HORAS ANTES DE EXPIRAR (LA VARIABLE SE ENCUENTRA EN EL ARCHIVO DE CONSTANTES)
      now.setTime(now.getTime() + (CONSTANTS.REFRESH_TOKEN_TIME * 60 * 60 * 1000));

      if (tokenExp.getTime() > now.getTime()) {
        return resolve(true);
      } else {
        this.authService.refreshToken(refresh_token)
          .subscribe((data: any) => {
            localStorage.setItem('access_token', data.access);
            resolve(true);
          }, (error) => {
            this.router.navigate(['/auth/']);
            reject(false);
          });
      }
    });
  }

  expired(expirationDate: number) {

    const now = new Date().getTime() / 1000;
    console.log('ENTRO');

    if (expirationDate < now) {
      return true;
    } else {
      return false;
    }

  }

}

