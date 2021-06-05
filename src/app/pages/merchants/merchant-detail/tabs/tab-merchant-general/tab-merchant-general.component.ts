import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MerchantsService } from 'src/app/services/merchants.service';
import { AddTagMerchantComponent } from '../tab-merchant-tags/add-tag-merchant/add-tag-merchant.component';

@Component({
  selector: 'app-tab-merchant-general',
  templateUrl: './tab-merchant-general.component.html',
  styleUrls: ['./tab-merchant-general.component.scss']
})
export class TabMerchantGeneralComponent implements OnInit {
  merchant;

  constructor(private merchantsService: MerchantsService,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.merchant = this.merchantsService.merchant;
  }
}

