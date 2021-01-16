import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MerchantsService } from 'src/app/services/merchants.service';
import { ValidationForms } from 'src/app/utils/validations-forms';

@Component({
  selector: 'app-merchant-detail',
  templateUrl: './merchant-detail.component.html',
  styleUrls: ['./merchant-detail.component.scss']
})
export class MerchantDetailComponent extends ValidationForms implements OnInit {

  merchantId;
  merchant;
  loadingInfo;

  constructor(private activatedRoute: ActivatedRoute, private merchantsService: MerchantsService) {
    super();
    this.activatedRoute.params.subscribe((params) => {
      this.merchantId = params['id'];
      this.getMerchant(this.merchantId);
    });
  }

  ngOnInit(): void {
  }

  getMerchant(merchantId) {
    this.loadingInfo = true;
    this.merchantsService.getMerchantById(merchantId).subscribe(
      (data: any) => {
        this.loadingInfo = false;
        this.merchant = data;
      }, error => {
        this.loadingInfo = false;
        this.showSwalMessage("Error al obtener información del comercio", 'error');
      });
  }

}
