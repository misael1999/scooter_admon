import { Component, Input, OnInit } from '@angular/core';
import { MerchantsService } from 'src/app/services/merchants.service';

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.scss']
})
export class MerchantListComponent implements OnInit {
  @Input() merchants;

  constructor(private merchantsService: MerchantsService) { }

  ngOnInit(): void {
  }

  openOrClose(isOpen, merchantId) {
    console.log(isOpen);
    console.log(merchantId);
    this.merchantsService.opeOrcloseMerchant(merchantId, isOpen)
      .subscribe((data) => {
      }, error => {
        alert('Ha ocurrido un error al cerrar el comercio');
      });
  }

}
