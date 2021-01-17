import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TagsComponent } from './tags/tags.component';
import { FaqComponent } from './faq/faq.component';

const routes: Routes = [
    { path: 'tag', component: TagsComponent },
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
