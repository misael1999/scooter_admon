import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgZorroModule } from '../shared/ng-zorro.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    NgZorroModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    HeaderComponent,
    SidebarComponent,
    RouterModule
  ]
})
export class LayoutModule { }
