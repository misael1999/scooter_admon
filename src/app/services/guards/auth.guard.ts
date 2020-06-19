import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router
  ) { }

  canActivate() {

    if (localStorage.getItem('access_token') && localStorage.getItem('station')) {
      return true;
    } else {
      this.router.navigate(['/auth/']);
      return false;
    }
  }
}
