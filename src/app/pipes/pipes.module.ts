import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberPhonePipe } from './number-phone.pipe';
import { SplitWordPipe } from './split-word.pipe';
import { CategoryPipe } from './category.pipe';



@NgModule({
  declarations: [NumberPhonePipe, SplitWordPipe, CategoryPipe],
  imports: [
    CommonModule
  ],
  exports: [
    SplitWordPipe,
    CategoryPipe
  ]
})
export class PipesModule { }
