import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DeliveryMenService } from '../../../../services/delivery-men.service';

@Component({
  selector: 'app-list-delivery',
  templateUrl: './list-delivery.component.html',
  styleUrls: ['./list-delivery.component.scss']
})
export class ListDeliveryComponent implements OnInit {
  deliverys: Array<any> = [];
  @Output() markers = new EventEmitter<any>();



  constructor( private deliveryService: DeliveryMenService) { }

  ngOnInit(): void {
    this.getDelivery();
  }
  getDelivery() {
    // this.loadingDelivery = true;
    this.deliveryService.getDeliverys()
    .subscribe( (data: any) => {
      this.deliverys = data.results;
      this.getCoordinates(data.results);
      // this.loadingDelivery = false;
      // this.length = data.count;
      console.log('Los repartidores registrados son ', this.deliverys);
    }, error => {
      // this.loadingDelivery = false;
    });

  }

  getCoordinates(deliveryMen: Array<any>) {
    const markerList = [];

    for (const delivery of deliveryMen ) {
      if (delivery.location) {
        const marker = {
          lat: delivery.location.coordinates[1],
          lng: delivery.location.coordinates[0],
          label: delivery.name.charAt(0)
        };
        markerList.push(marker);
      }
    }

    this.markers.emit(markerList);
  }

}
