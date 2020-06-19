import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Merchant } from 'src/app/models/merchant.model';

@Injectable({
  providedIn: 'root'
})
export class CompleteProfileGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      // Verify that the merchant exists and does not have a complete configuration  ========

      const merchant: Merchant = JSON.parse(localStorage.getItem('user'));
      if (merchant) {
        if (!merchant.config.complete_config) {
            this.router.navigate(['/complete-profile/']);
            return false;
        }
        return true;
      }

      return false;
  }

}
