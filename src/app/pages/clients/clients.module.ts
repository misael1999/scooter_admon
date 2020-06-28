import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientListComponent } from './client-list/client-list.component';
import { InfoClientComponent } from './info-client/info-client.component';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsService } from '../../services/clients.service';



@NgModule({
  declarations: [
    ClientListComponent,
    InfoClientComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule
  ],
  providers:[
    ClientsService
  ]
})
export class ClientsModule { }
