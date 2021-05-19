import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabPromotionsComponent } from './tab-promotions.component';
import { AddPromotionComponent } from './add-promotion/add-promotion.component';
import { TypeOfPromotionsComponent } from './type-of-promotions/type-of-promotions.component';

const routes: Routes = [
    {
        path: "", component: TabPromotionsComponent,
    },
    {
        path: "add", component: AddPromotionComponent,
    },
    {
        path: "type", component: TypeOfPromotionsComponent,
    },
    { path: '', redirectTo: '', pathMatch: 'full' }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TabPromotionsRoutingModule { }
