import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';



const components = [
  MatDialogModule,
  MatPaginatorModule,
  MatSelectModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatCheckboxModule,
  MatSlideToggleModule
];

@NgModule({
  declarations: [],
  imports: components,
  exports: components
})
export class AngularMaterialModule { }
