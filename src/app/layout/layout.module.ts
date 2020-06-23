import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NotificationsComponent } from './header/notifications/notifications.component';
import { MessagesComponent } from './header/messages/messages.component';
import { UserInformationComponent } from './header/user-information/user-information.component';
import { SearchComponent } from './header/search/search.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    NotificationsComponent,
    MessagesComponent,
    UserInformationComponent,
    SearchComponent
  ],
  exports: [
    HeaderComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class LayoutModule { }
