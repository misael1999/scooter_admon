import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { DeliveryMenService } from '../../../services/delivery-men.service';

@Component({
  selector: 'app-info-delivery',
  templateUrl: './info-delivery.component.html',
  styleUrls: ['./info-delivery.component.scss']
})
export class InfoDeliveryComponent implements OnInit {
  idDelivery: number;
  infoDelivery;
  from_date;
  to_date;
  params: {};

  constructor(private deliveryService: DeliveryMenService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.idDelivery = this.activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.getDeliveryId();
  }

  selectFromDate(fromDate) {
    const momentDate = new Date(fromDate);
    this.from_date = moment(fromDate).format('YYYY-MM-DD');
    if (this.from_date && this.to_date) {
      this.getDeliveryId({ from_date: this.from_date, to_date: this.to_date });

    }
  }

  selectTodate(toDate) {
    const momentDate = new Date(toDate);
    this.to_date = moment(toDate).format('YYYY-MM-DD');
    if (this.from_date && this.to_date) {
      this.getDeliveryId({ from_date: this.from_date, to_date: this.to_date });


    }
  }

  getDeliveryId(params = {}) {
    this.deliveryService.getDeliveryById(this.idDelivery, params)
      .subscribe((data: any) => {
        this.infoDelivery = data;
      }, error => {
        if (error.errors.code === 'not_found') {
          this.router.navigate(['not_found']);
          return;
        }
      });
  }

}
