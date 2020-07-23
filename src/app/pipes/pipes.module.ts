import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberPhonePipe } from './number-phone.pipe';
import { SplitWordPipe } from './split-word.pipe';



@NgModule({
  declarations: [NumberPhonePipe, SplitWordPipe],
  imports: [
    CommonModule
  ],
  exports: [
    SplitWordPipe
  ]
})
export class PipesModule { }
