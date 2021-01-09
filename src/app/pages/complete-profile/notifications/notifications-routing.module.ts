import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainNotificationsComponent } from './main-notifications/main-notifications.component';


const routes: Routes = [
  { path: 'info', component: MainNotificationsComponent },
  { path: '', redirectTo: 'info', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationsRoutingModule { }
