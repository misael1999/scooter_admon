import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PromotionsCentralService } from 'src/app/services/promotions-central.service';
import { MerchantsService } from '../../../../../services/merchants.service';

@Component({
  selector: 'app-tab-promotions',
  templateUrl: './tab-promotions.component.html',
  styleUrls: ['./tab-promotions.component.scss']
})
export class TabPromotionsComponent implements OnInit {
  length = 0;
  pageSize = 25;
  pageIndex = 0;
  pageEvent: PageEvent;
  pageSizeOptions: number[] = [25, 50, 75, 100];
  params = { limit: 25, offset: 0, search: '', ordering: '', };
  loadingData: boolean;
  promotions: Array<any> = [];
  searchText;

  constructor(
    private promotionsCentralService: PromotionsCentralService,
    private merchantsService: MerchantsService) { }

  ngOnInit(): void {
    this.getPromotions();
  }

  getPromotions() {
    this.loadingData = true;
    this.promotionsCentralService.getPromotionsByMerchant(
      this.merchantsService.merchantId, this.params)
      .subscribe((data: any) => {
        this.loadingData = false;
        this.promotions = data.results;
        console.log(this.promotions);
        this.length = data.count;
        this.merchantsService.params = this.params;
        this.pageIndex = (this.params.offset / this.params.limit);
      }, error => {
        this.loadingData = false;
      });
  }


  orderBy(value) {
    this.params.ordering = value;
    this.getPromotions();
  }

  showList(value) {
    // this.params.status = value;
    this.getPromotions();
  }



  searchBy(value: string) {
    this.params.search = value;
    this.merchantsService.searchText = value;
    this.getPromotions();
  }

  clearSearch() {
    this.params.search = '';
    this.merchantsService.searchText = '';
    this.searchText = '';
    this.getPromotions();
  }

  getPages(e): PageEvent {
    if (this.promotions.length === 0) {
      this.pageSize = 25;
      this.pageIndex = 0;
      return;
    }
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.params.limit = e.pageSize;
    this.params.offset = this.params.limit * e.pageIndex;
    this.getPromotions();
  }

}
