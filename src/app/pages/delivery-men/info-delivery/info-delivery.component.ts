import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info-delivery',
  templateUrl: './info-delivery.component.html',
  styleUrls: ['./info-delivery.component.scss']
})
export class InfoDeliveryComponent implements OnInit {
  idDelivery: number;

  constructor(private activatedRoute: ActivatedRoute) {
    this.idDelivery = this.activatedRoute.snapshot.params.id;
    console.log('El id es', this.idDelivery);
  }

  ngOnInit(): void {
  }

}
