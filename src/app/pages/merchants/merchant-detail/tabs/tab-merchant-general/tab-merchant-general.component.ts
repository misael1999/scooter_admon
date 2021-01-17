import { Component, Input, OnInit } from '@angular/core';
import { MerchantsService } from 'src/app/services/merchants.service';
import { MerchantModel } from '../../../../../models/merchant.model';

@Component({
  selector: 'app-tab-merchant-general',
  templateUrl: './tab-merchant-general.component.html',
  styleUrls: ['./tab-merchant-general.component.scss']
})
export class TabMerchantGeneralComponent implements OnInit {

  @Input() merchant;

  constructor(private merchantsService: MerchantsService) {
  }

  ngOnInit(): void {
  }

}

