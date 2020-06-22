import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardProfileComponent } from './wizard-profile/wizard-profile.component';
import { CompleteProfileRoutingModule } from './complete-profile-routing.module';
import { AgmCoreModule } from '@agm/core';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardServiceComponent } from './wizard-profile/card-service/card-service.component';
import { ScheduleComponent } from './wizard-profile/schedule/schedule.component';
import { AmazingTimePickerModule } from 'amazing-time-picker';



@NgModule({
  declarations: [WizardProfileComponent, CardServiceComponent, ScheduleComponent],
  imports: [
    CommonModule,
    CompleteProfileRoutingModule,
    FormsModule,
    AmazingTimePickerModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyDcAruMxBUQlW9S672oSoe1dyr7l8WIxlU'
    })
  ]
})
export class CompleteProfileModule { }
