import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientListComponent } from './client-list/client-list.component';
import { InfoClientComponent } from './info-client/info-client.component';
import { ClientsRoutingModule } from './clients-routing.module';
import { AngularMaterialModule } from '../../shared/angular-material.module';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    ClientListComponent,
    InfoClientComponent],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    AngularMaterialModule,
    SharedModule
  ],
})
export class ClientsModule { }
