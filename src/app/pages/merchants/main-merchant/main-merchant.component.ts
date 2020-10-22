import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MerchantsService } from 'src/app/services/merchants.service';

@Component({
  selector: 'app-main-merchant',
  templateUrl: './main-merchant.component.html',
  styleUrls: ['./main-merchant.component.scss']
})
export class MainMerchantComponent implements OnInit {

  loadingMerchants: boolean;
  merchants: Array<any> = [];

  // MatPaginator Inputs
  length = 100;
  pageSize = 25;
  pageSizeOptions: number[] = [25, 50, 75, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  statusFilter: boolean;

  // Parametros para el paginado
  params = { limit: 25, offset: 0, search: '', ordering: 'created' };

  constructor(private merchantsService: MerchantsService) { }

  ngOnInit(): void {
    this.getMerchants();
  }

  dialogAddMerchant() {

  }

  getMerchants() {
    this.loadingMerchants = true;
    this.merchantsService.getMerchants(this.params)
      .subscribe((data: any) => {
        this.loadingMerchants = false;
        this.merchants = data.results;
        this.length = data.count;
      }, error => {
        this.loadingMerchants = false;
        alert('Ha ocurrido un error al obtener los comercios');
      });
  }

  searchBy(value: string) {
    this.params.search = value;
    this.getMerchants();
  }
  ordenamiento(value: string) {
    this.params.ordering = value;
    this.getMerchants();
  }

  // Metodo paginator
  getPages(e): PageEvent {

    if (this.merchants.length === 0) {
      this.pageSize = 25;
      return;
    }

    this.params.limit = e.pageSize;
    this.params.offset = this.params.limit * e.pageIndex;
  }

}