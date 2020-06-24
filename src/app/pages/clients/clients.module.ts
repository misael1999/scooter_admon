import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientListComponent } from './client-list/client-list.component';
import { InfoClientComponent } from './info-client/info-client.component';
import { ClientsRoutingModule } from './clients-routing.module';



@NgModule({
  declarations: [ClientListComponent, InfoClientComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule
  ]
})
export class ClientsModule { }
