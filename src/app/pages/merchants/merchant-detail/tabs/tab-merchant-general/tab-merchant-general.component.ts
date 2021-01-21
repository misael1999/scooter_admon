import { Component, Input, OnInit } from '@angular/core';
import { MerchantsService } from '../../../../../services/merchants.service';

@Component({
  selector: 'app-tab-merchant-general',
  templateUrl: './tab-merchant-general.component.html',
  styleUrls: ['./tab-merchant-general.component.scss']
})
export class TabMerchantGeneralComponent implements OnInit {

  merchant;

  constructor(private merchantsService: MerchantsService) {
    this.merchant = this.merchantsService.merchantId;
    console.log('Datos del comercip', this.merchant);

  }

  ngOnInit(): void {
  }

}

