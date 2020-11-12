import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ZonesService } from 'src/app/services/zones.service';
import { ValidationForms } from 'src/app/utils/validations-forms';

@Component({
  selector: 'app-zones-list',
  templateUrl: './zones-list.component.html',
  styleUrls: ['./zones-list.component.scss']
})
export class ZonesListComponent extends ValidationForms implements OnInit {

  @Input() zones = [];
  @Output() emitEditZone = new EventEmitter<any>();
  @Output() reloadZone = new EventEmitter<any>();

  constructor(private zoneService: ZonesService) { super() }

  ngOnInit(): void {
  }

  editZone(zone) {
    this.emitEditZone.emit(zone);
  }

  deleteZone(zoneId) {
    this.zoneService.deleteZone(zoneId)
      .subscribe((data: any) => {
        this.showSwalMessage('Zona desactivada correctamente');
        this.reloadZone.emit(true);
      }, error => {
        this.showSwalMessage('Error al desactivar la zona', 'error')
      });
  }

  activeZone(zoneId) {
    this.zoneService.activeZone(zoneId)
    .subscribe((data: any) => {
      this.showSwalMessage('Zona activada correctamente');
      this.reloadZone.emit(true);
    }, error => {
      this.showSwalMessage('Error al activar la zona', 'error')
    });
  }

}
