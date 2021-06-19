import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MerchantsService } from 'src/app/services/merchants.service';
import { ValidationForms } from 'src/app/utils/validations-forms';
import { MerchantModel } from 'src/app/models/merchant.model';

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.scss']
})
export class MerchantListComponent extends ValidationForms implements OnInit {
  @Input() merchants: MerchantModel;
  @Input() params;
  @Output() reloadMerchants = new EventEmitter<boolean>();

  constructor(
    private merchantsService: MerchantsService) {
    super();
  }

  ngOnInit(): void { }

  async disabledMerchant(idMerchant) {
    const confirmation = await this.showMessageConfirm('De bloquear al comercio');
    if (!confirmation.value) { return; }

    this.merchantsService.deleteMerchant(idMerchant)
      .subscribe((data) => {
        this.showSwalMessage('Comercio bloqueado correctamente');
        this.reloadMerchants.emit(true);
      }, error => {
        this.showSwalMessage(error.errors.message, 'error');
      });
  }

  async enableMerchant(idMerchant) {
    const confirmation = await this.showMessageConfirm('De desbloquear al comercio');
    if (!confirmation.value) { return; }

    // this.merchantsService.unlockMerchant(idMerchant)
    //   .subscribe((data) => {
    //     this.showSwalMessage('Comercio desbloqueado correctamente');
    //     this.reloadMerchants.emit(true);
    //   }, error => {
    //     this.showSwalMessage(error.errors.message, 'error');
    //   });
  }

  openOrClose(isOpen, merchantId) {
    this.merchantsService.opeOrcloseMerchant(merchantId, isOpen)
      .subscribe((data) => {
      }, error => {
        this.showSwalMessage(error.errors.message, 'error');
      });
  }
}
