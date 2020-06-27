import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MapTraicingComponent } from './map-traicing/map-traicing.component';
import { ListDeliveryComponent } from './map-traicing/list-delivery/list-delivery.component';


import { TraicingRoutingModule } from './traicing-routing.module';
import { AngularMaterialModule } from '../../shared/angular-material.module';
import { MapLocationComponent } from './map-traicing/map-location/map-location.component';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    MapTraicingComponent,
    ListDeliveryComponent,
    MapLocationComponent,

  ],
  imports: [
    CommonModule,
    TraicingRoutingModule,
    AngularMaterialModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyDcAruMxBUQlW9S672oSoe1dyr7l8WIxlU'
    })
  ]
})
export class TraicingModule { }
