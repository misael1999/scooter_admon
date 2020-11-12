import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ZonesRoutingModule } from './zones-routing.module';
import { MainZonesComponent } from './main-zones/main-zones.component';
import { AgmCoreModule } from '@agm/core';
import { AddZoneDialogComponent } from './add-zone-dialog/add-zone-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { AreaComponent } from './area/area.component';
import { ZonesListComponent } from './zones-list/zones-list.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';



@NgModule({
  declarations: [
    MainZonesComponent,
    AddZoneDialogComponent,
    AreaComponent,
    ZonesListComponent
  ],
  imports: [
    CommonModule,
    ZonesRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyDcAruMxBUQlW9S672oSoe1dyr7l8WIxlU'
    })
  ],
  entryComponents: [
    AddZoneDialogComponent
  ]
})
export class ZonesModule { }
