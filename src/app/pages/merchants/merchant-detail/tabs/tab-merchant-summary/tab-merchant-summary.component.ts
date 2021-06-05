import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrdersDetailComponent } from 'src/app/pages/orders/orders-detail/orders-detail.component';
import { MerchantsService } from 'src/app/services/merchants.service';

@Component({
  selector: 'app-tab-merchant-summary',
  templateUrl: './tab-merchant-summary.component.html',
  styleUrls: ['./tab-merchant-summary.component.scss']
})
export class TabMerchantSummaryComponent implements OnInit {

  merchant;
  data;

  date = null;
  month = '';
  year = '';
  dataSummary: any;
  loadingData: boolean;

  constructor(private merchantService: MerchantsService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.merchant = this.merchantService.merchantId;

    const now = new Date();
    const numberMonth = now.getMonth() + 1;
    this.month = this.getMonthName(numberMonth);
    this.year = now.getFullYear().toString();
    this.date = now;
    this.getSummaryData(numberMonth);
  }

  changeDate(result: Date): void {
    if (result != null) {
      const numberMonth = result.getMonth() + 1;
      this.month = this.getMonthName(numberMonth);
      this.year = result.getFullYear().toString();
      this.getSummaryData(numberMonth);
    }
  }

  getSummaryData(month) {
    this.loadingData = true;
    this.merchantService.getSummaryMerchant(this.merchant.id, { month })
      .subscribe((data) => {
        this.dataSummary = data;
        this.loadingData = false;

      }, error => {
        this.loadingData = false;
      });

  }

  getMonthName(month) {
    switch (month) {
      case 1:
        return 'Enero';
      case 2:
        return 'Febrero';
      case 3:
        return 'Marzo';
      case 4:
        return 'Abril';
      case 5:
        return 'Mayo';
      case 6:
        return 'Junio';
      case 7:
        return 'Julio';
      case 8:
        return 'Agosto';
      case 9:
        return 'Septiembre';
      case 10:
        return 'Octubre';
      case 11:
        return 'Noviembre';
      case 12:
        return 'Diciembre';
    }
  }

  openDialogDetailProducts(order = null) {
    this.dialog.open(OrdersDetailComponent, {
      width: '90%',
      data: { orderId: order.id }
    });
  }


}
