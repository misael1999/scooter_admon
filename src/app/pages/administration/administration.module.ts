import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsComponent } from './tags/tags.component';
import { FaqComponent } from './faq/faq.component';
import { AdministrationRoutingModule } from './administration-routing.module';
import { AddFaqComponent } from './faq/add-faq/add-faq.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddGroupFaqComponent } from './faq/add-group-faq/add-group-faq.component';
import { AddTagComponent } from './tags/add-tag/add-tag.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../../shared/shared.module';
import { MainTagsComponent } from './tags/main-tags/main-tags.component';
import { ListTagsComponent } from './tags/list-tags/list-tags.component';
@NgModule({
  declarations: [
    FaqComponent,
    AddFaqComponent,
    TagsComponent,
    AddGroupFaqComponent,
    AddTagComponent,
    MainTagsComponent,
    ListTagsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AdministrationRoutingModule,
    MatDialogModule,
    FormsModule,
    SharedModule
  ]
})
export class AdministrationModule { }
