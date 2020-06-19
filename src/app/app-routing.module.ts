import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { AuthGuard } from './services/guards/auth.guard';
import { RefreshTokenGuard } from './services/guards/refresh-token.guard';
import { CompleteProfileGuard } from './services/guards/complete-profile.guard';


const routes: Routes = [
  {
    path: '', component: PagesComponent,
    canActivate: [CompleteProfileGuard, AuthGuard, RefreshTokenGuard],
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: 'complete-profile',
    loadChildren: () => import('./pages/complete-profile/complete-profile.module').then(m => m.CompleteProfileModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
