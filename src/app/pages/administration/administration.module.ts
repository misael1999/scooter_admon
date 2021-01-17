import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsComponent } from './tags/tags.component';
import { FaqComponent } from './faq/faq.component';
import { AdministrationRoutingModule } from './administration-routing.module';
import { AddFaqComponent } from './faq/add-faq/add-faq.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddGroupFaqComponent } from './faq/add-group-faq/add-group-faq.component';



@NgModule({
  declarations: [
    FaqComponent,
    AddFaqComponent,
    TagsComponent,
    AddGroupFaqComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }
