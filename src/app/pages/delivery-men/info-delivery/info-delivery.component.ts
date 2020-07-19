import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeliveryMenService } from '../../../services/delivery-men.service';

@Component({
  selector: 'app-info-delivery',
  templateUrl: './info-delivery.component.html',
  styleUrls: ['./info-delivery.component.scss']
})
export class InfoDeliveryComponent implements OnInit {

  idDelivery: number;
  delivery: Array<any> = [];
  paramsDate = { fromDate: new Date(), toDate: new Date() };

  constructor(private deliveryService: DeliveryMenService, private activatedRoute: ActivatedRoute) {
    this.idDelivery = this.activatedRoute.snapshot.params.id;
    console.log('El id es', this.idDelivery);

  }

  ngOnInit(): void {
  }

  getDelivery(id, number) {
    this.deliveryService.getDeliveryById(id, this.paramsDate)
      .subscribe((data: any) => {
        this.delivery = data;
        console.log(this.delivery);

      }, error => {

      });

  }

}
