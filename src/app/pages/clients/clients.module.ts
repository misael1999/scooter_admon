import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientListComponent } from './client-list/client-list.component';
import { InfoClientComponent } from './info-client/info-client.component';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsService } from '../../services/clients.service';
import { AngularMaterialModule } from '../../shared/angular-material.module';



@NgModule({
  declarations: [
    ClientListComponent,
    InfoClientComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    AngularMaterialModule
  ],
})
export class ClientsModule { }
