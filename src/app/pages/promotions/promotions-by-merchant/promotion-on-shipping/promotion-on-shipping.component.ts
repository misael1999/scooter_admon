import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promotion-on-shipping',
  templateUrl: './promotion-on-shipping.component.html',
  styleUrls: ['./promotion-on-shipping.component.scss']
})
export class PromotionOnShippingComponent implements OnInit {
  current = 0;
  merchant;

  constructor() { }

  ngOnInit(): void {
  }

  selectMerchant(merchant) {
    this.merchant = merchant;
    this.current++;
  }

  removeMerchant() {
    this.merchant = null;
    this.current = 0;
  }

}
