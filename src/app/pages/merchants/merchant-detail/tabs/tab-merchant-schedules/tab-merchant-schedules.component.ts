import { Component, Input, OnInit } from '@angular/core';
import { MerchantsService } from '../../../../../services/merchants.service';

@Component({
  selector: 'app-tab-merchant-schedules',
  templateUrl: './tab-merchant-schedules.component.html',
  styleUrls: ['./tab-merchant-schedules.component.scss']
})
export class TabMerchantSchedulesComponent implements OnInit {

  merchant: Array<any> = [];

  constructor(private merchantsService: MerchantsService) { }

  ngOnInit(): void {    
    this.merchant = this.merchantsService.merchantId.tags;
    console.log('esta es la info', this.merchant);
  }

}
