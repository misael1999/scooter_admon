import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainClientsComponent } from './main-clients/main-clients.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { ProfileComponent } from './client-detail/tabs/profile/profile.component';
import { OrderHistoryComponent } from './client-detail/tabs/order-history/order-history.component';
import { InfoClientComponent } from './info-client/info-client.component';

const routes: Routes = [
    { path: '', component: MainClientsComponent },
    {
        path: ':id/detail', component: ClientDetailComponent, children: [
            {
                path: 'profile', component: ProfileComponent
            },
            {
                path: 'order-history', component: InfoClientComponent
            },

            { path: '', redirectTo: 'profile', pathMatch: 'full' }
        ]
    },
    { path: '', redirectTo: '', pathMatch: 'full' }

];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class ClientsRoutingModule { }
