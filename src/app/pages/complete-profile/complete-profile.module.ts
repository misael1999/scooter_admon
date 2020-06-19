import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WizardProfileComponent } from './wizard-profile/wizard-profile.component';
import { CompleteProfileRoutingModule } from './complete-profile-routing.module';
import { AgmCoreModule } from '@agm/core';



@NgModule({
  declarations: [WizardProfileComponent],
  imports: [
    CommonModule,
    CompleteProfileRoutingModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyBzmoQUPeqE3yHpGsAGwLuHwjkvnSpLfM8'
    })
  ]
})
export class CompleteProfileModule { }
