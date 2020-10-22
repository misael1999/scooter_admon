import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { MainNotificationsComponent } from './main-notifications/main-notifications.component';


@NgModule({
  declarations: [MainNotificationsComponent],
  imports: [
    CommonModule,
    NotificationsRoutingModule
  ]
})
export class NotificationsModule { }
