import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgZorroModule } from '../shared/ng-zorro.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [HeaderComponent, SidebarComponent],
  imports: [
    CommonModule,
    NgZorroModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    SidebarComponent,
    RouterModule
  ]
})
export class LayoutModule { }
