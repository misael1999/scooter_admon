import { Component, Input, OnInit } from '@angular/core';
import { MerchantsService } from '../../../../../services/merchants.service';

@Component({
  selector: 'app-tab-merchant-schedules',
  templateUrl: './tab-merchant-schedules.component.html',
  styleUrls: ['./tab-merchant-schedules.component.scss']
})
export class TabMerchantSchedulesComponent implements OnInit {

  schedules: Array<any> = [];

  constructor(private merchantsService: MerchantsService) { }

  ngOnInit(): void {    
    this.schedules = this.merchantsService.merchantId.tags;
    console.log('esta es la info', this.schedules);
  }

}
