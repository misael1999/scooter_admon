import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainSupportComponent } from './main-support/main-support.component';

const routes: Routes = [
  { path: '', component: MainSupportComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupportRoutingModule { }
