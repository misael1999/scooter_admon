import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// ======= ANT MODULES ========
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';

const modules = [
  NzIconModule,
  NzListModule
]


@NgModule({
  declarations: [],
  imports: modules,
  exports: modules
})
export class NgZorroModule { }
