import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MerchantsService } from 'src/app/services/merchants.service';

@Component({
  selector: 'app-tab-products',
  templateUrl: './tab-products.component.html',
  styleUrls: ['./tab-products.component.scss']
})
export class TabProductsComponent implements OnInit {
  length = 0;
  pageSize = 25;
  pageIndex = 0;
  pageEvent: PageEvent;
  pageSizeOptions: number[] = [25, 50, 75, 100];
  params = { limit: 25, offset: 0, search: '', ordering: '', status: 1 };
  loadingData: boolean;
  products;
  searchText;

  constructor(private merchantsService: MerchantsService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.loadingData = true;
    this.merchantsService.getProductsByMerchant(this.merchantsService.merchantId, this.params)
      .subscribe((data: any) => {
        this.loadingData = false;
        this.products = data.results;
        this.length = data.count;
        this.merchantsService.params = this.params;
        this.pageIndex = (this.params.offset / this.params.limit);
      }, error => {
        this.loadingData = false;
      });
  }


  orderBy(value) {
    this.params.ordering = value;
    this.getProducts()
  }

  showList(value) {
    this.params.status = value;
    this.getProducts();
  }

  searchBy(value: string) {
    this.params.search = value;
    this.merchantsService.searchText = value;
    this.getProducts()
  }

  clearSearch() {
    this.params.search = '';
    this.merchantsService.searchText = '';
    this.searchText = '';
    this.getProducts();
  }


  getPages(e): PageEvent {
    if (this.products.length === 0) {
      this.pageSize = 25;
      this.pageIndex = 0;
      return;
    }
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.params.limit = e.pageSize;
    this.params.offset = this.params.limit * e.pageIndex;
    this.getProducts();
  }
}
