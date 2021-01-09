import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { MainNotificationsComponent } from './main-notifications/main-notifications.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [MainNotificationsComponent],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    ReactiveFormsModule
  ]
})
export class NotificationsModule { }
