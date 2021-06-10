import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { DeliveryMenService } from '../../../../services/delivery-men.service';
import { timer, Observable, interval, Subscription } from 'rxjs';
import * as L from 'leaflet';
@Component({
  selector: 'app-list-delivery',
  templateUrl: './list-delivery.component.html',
  styleUrls: ['./list-delivery.component.scss']
})
export class ListDeliveryComponent implements OnInit, OnDestroy {
  deliverys: Array<any> = [];
  params = { search: '', status: 1 };
  // Pasa los marcadores de los deliverys
  @Output() markers = new EventEmitter<any>();
  // Pasa la ubicacion de un delivery
  @Output() location = new EventEmitter<any>();
  private intervalDelivery: Observable<number> = interval(4000);
  private subscription: Subscription;


  constructor(private deliveryService: DeliveryMenService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getDelivery();
    this.subscription = this.intervalDelivery.subscribe((data: any) => {
      this.getDelivery();
    });
  }


  getDelivery() {
    this.deliveryService.getDeliverys(this.params)
      .subscribe((data: any) => {
        this.getCoordinates(data.results);
      }, error => {
        alert('Error al consultar repartidores');
      });
  }

  getCoordinates(deliveryMen: Array<any>) {
    const markerList = [];
    const delivery_men = [];
    for (const delivery of deliveryMen) {
      if (delivery.location) {
        const marker = {
          lat: delivery.location.coordinates[1],
          lng: delivery.location.coordinates[0],
          label: delivery.name.charAt(0),
          name: delivery.name
        };
        markerList.push(marker);
        delivery_men.push(delivery);
      }
    }
    this.markers.emit(markerList);
    this.deliverys = delivery_men;
  }



  navigationToLocation(delivery) {
    if (delivery.location) {
      const coordinates = {
        lat: delivery.location.coordinates[1],
        lng: delivery.location.coordinates[0]
      };
      this.location.emit(coordinates);
    }
  }


  searchBy(value: string) {
    this.params.search = value;
    this.getDelivery();
  }
}
