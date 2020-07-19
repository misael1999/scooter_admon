import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberPhonePipe } from './number-phone.pipe';



@NgModule({
  declarations: [NumberPhonePipe],
  imports: [
    CommonModule
  ]
})
export class PipesModule { }
