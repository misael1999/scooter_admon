import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WizardProfileComponent } from './wizard-profile/wizard-profile.component';


const routes: Routes = [
  {
    path: '', component: WizardProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompleteProfileRoutingModule { }
