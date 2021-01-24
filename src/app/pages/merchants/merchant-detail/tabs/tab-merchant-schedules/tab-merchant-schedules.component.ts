import { Component, Input, OnInit } from '@angular/core';
import { MerchantsService } from '../../../../../services/merchants.service';

@Component({
  selector: 'app-tab-merchant-schedules',
  templateUrl: './tab-merchant-schedules.component.html',
  styleUrls: ['./tab-merchant-schedules.component.scss']
})
export class TabMerchantSchedulesComponent implements OnInit {

  schedules: Array<any> = [];

  constructor(private merchantsService: MerchantsService) {
    this.schedules = this.merchantsService.merchantId.schedules;
    console.log('Schedules by merchant', this.schedules);
  }

  ngOnInit(): void {
  }

}
