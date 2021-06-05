import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MerchantsService } from 'src/app/services/merchants.service';
import { MerchantsAddComponent } from '../merchants-add/merchants-add.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-main-merchant',
  templateUrl: './main-merchant.component.html',
  styleUrls: ['./main-merchant.component.scss']
})
export class MainMerchantComponent implements OnInit {
  length = 0;
  pageSize = 25;
  pageIndex = 0;
  pageEvent: PageEvent;
  pageSizeOptions: number[] = [25, 50, 75, 100];
  params = { limit: 25, offset: 0, search: '', ordering: '', status: 1, information_is_complete: true };
  loadingData: boolean;
  merchants: Array<any> = [];
  searchText;

  constructor(
    private merchantsService: MerchantsService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getMerchants();
  }

  openDialogAddMerchant() {
    const dialogRef = this.dialog.open(MerchantsAddComponent, {
      disableClose: true,
      width: '90%',
      data: {}
    });
    dialogRef.afterClosed()
      .subscribe((data: any) => {
        if (data) {
          this.getMerchants();
        }
      });
  }

  getMerchants() {
    this.loadingData = true;
    this.merchantsService.getMerchants(this.params)
      .subscribe((data: any) => {
        this.loadingData = false;
        this.merchants = data.results;
        this.length = data.count;
        this.merchantsService.params = this.params;
        this.pageIndex = (this.params.offset / this.params.limit);
      }, error => {
        this.loadingData = false;
      });
  }

  orderBy(value) {
    this.params.ordering = value;
    this.getMerchants();
  }

  showList(value) {
    this.params.status = value;
    this.getMerchants();
  }

  showinfoIsComplete(value) {
    this.params.information_is_complete = value;
    this.getMerchants();
  }

  searchBy(value: string) {
    this.params.search = value;
    this.merchantsService.searchText = value;
    this.getMerchants();
  }

  clearSearch() {
    this.params.search = '';
    this.merchantsService.searchText = '';
    this.searchText = '';
    this.getMerchants();
  }

  getPages(e): PageEvent {
    if (this.merchants.length === 0) {
      this.pageSize = 25;
      this.pageIndex = 0;
      return;
    }
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.params.limit = e.pageSize;
    this.params.offset = this.params.limit * e.pageIndex;
    this.getMerchants();
  }
}
