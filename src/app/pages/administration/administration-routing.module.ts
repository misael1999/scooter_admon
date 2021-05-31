import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TagsComponent } from './tags/tags.component';
import { FaqComponent } from './faq/faq.component';
import { MainTagsComponent } from './tags/main-tags/main-tags.component';

const routes: Routes = [
    { path: 'tag', component: MainTagsComponent },
    { path: 'faq', component: FaqComponent },
    { path: '', redirectTo: 'tag', pathMatch: 'full' }

];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdministrationRoutingModule { }
