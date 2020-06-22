import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlreadyInfoCompleteGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     // Verify that the station exists and does not have a complete configuration  ========

     const station = JSON.parse(localStorage.getItem('station'));
     if (station) {
       if (station.information_is_complete) {
           this.router.navigate(['/dashboard/']);
           return false;
       }
       return true;
     }

     this.router.navigate(['/auth/']);
     return false;
  }
}
