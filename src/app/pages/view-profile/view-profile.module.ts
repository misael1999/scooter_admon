import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { ViewProfileRoutingModule } from './view-profile-routing.module';



@NgModule({
  declarations: [
    ProfileComponent],
  imports: [
    CommonModule,
    ViewProfileRoutingModule
  ]
})
export class ViewProfileModule { }
