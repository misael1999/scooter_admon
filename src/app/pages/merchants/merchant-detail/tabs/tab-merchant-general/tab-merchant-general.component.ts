import { Component, OnInit } from '@angular/core';
import { MerchantsService } from 'src/app/services/merchants.service';

@Component({
  selector: 'app-tab-merchant-general',
  templateUrl: './tab-merchant-general.component.html',
  styleUrls: ['./tab-merchant-general.component.scss']
})
export class TabMerchantGeneralComponent implements OnInit {
  merchant;

  constructor(private merchantsService: MerchantsService) {
  }

  ngOnInit(): void {
    this.merchant = this.merchantsService.merchant;
    console.log('Data profile', this.merchant);
  }
}

