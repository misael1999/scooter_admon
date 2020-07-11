import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { AuthGuard } from './services/guards/auth.guard';
import { RefreshTokenGuard } from './services/guards/refresh-token.guard';
import { CompleteProfileGuard } from './services/guards/complete-profile.guard';
import { AlreadyInfoCompleteGuard } from './services/guards/already-info-complete.guard';
import { PageNoFound404Component } from './shared/page-no-found404/page-no-found404.component';


const routes: Routes = [
  {
    path: '', component: PagesComponent,
    // CompleteProfileGuard
    canActivate: [CompleteProfileGuard, AuthGuard, RefreshTokenGuard],
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: 'complete-profile',
    canActivate: [AlreadyInfoCompleteGuard],
    loadChildren: () => import('./pages/complete-profile/complete-profile.module').then(m => m.CompleteProfileModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'not_found', component: PageNoFound404Component
  },
  { path: '**', component: PageNoFound404Component }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
