import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ClientsService } from 'src/app/services/clients.service';
import { PromotionsService } from 'src/app/services/promotions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-promotions-list',
  templateUrl: './promotions-list.component.html',
  styleUrls: ['./promotions-list.component.scss']
})
export class PromotionsListComponent implements OnInit {

  // MatPaginator Inputs
  length = 100;
  pageSize = 25;
  pageSizeOptions: number[] = [25, 50, 75, 100];

  date = new Date();

  // MatPaginator Output
  pageEvent: PageEvent;

  // Parametros para el paginado
  params = { limit: 25, offset: 0, search: '', ordering: '', used: '' };
  loadingPromotions: boolean;
  promotions: Array<any> = [];
  searchText;



  constructor(private promotinsService: PromotionsService,
    private dialog: MatDialog,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.getClientsPromotion();
  }


  getClientsPromotion() {
    this.loadingPromotions = true;
    this.promotinsService.getCustomersPromotions(this.params).subscribe((data: any) => {
      this.promotions = data.results;
      console.log(this.promotions);
      this.length = data.count;
      this.loadingPromotions = false;
    }, error => {
      this.loadingPromotions = false;
    });
  }

  searchBy(value: string) {
    this.params.search = value;
    this.getClientsPromotion();
  }

  clearSearch() {
    this.params.search = '';
    this.searchText = "";
    this.getClientsPromotion();
  }

  orderBy(value: string) {
    this.params.ordering = value;
    this.getClientsPromotion();
  }

  filterBy(value: string) {
    this.params.used = value;
    this.getClientsPromotion();
  }

  // Metodo paginator
  getPages(e): PageEvent {
    if (this.promotions.length === 0) {
      this.pageSize = 25;
      return;
    }
    this.params.limit = e.pageSize;
    this.params.offset = this.params.limit * e.pageIndex;
    this.getClientsPromotion();
  }


}
