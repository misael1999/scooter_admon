import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MerchantsService } from 'src/app/services/merchants.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-merchants-list',
  templateUrl: './merchants-list.component.html',
  styleUrls: ['./merchants-list.component.scss']
})
export class MerchantsListComponent implements OnInit {
   // MATPAGINATOR INPUTS
   length = 0;
   pageSize = 25;
   pageIndex = 0;
   pageSizeOptions: number[] = [25, 50, 75, 100];


   // MATPAGINATOR  OUTPUT
   pageEvent: PageEvent;


   // PARAMETROS
   params = { limit: 25, offset: 0, page: 1, search: '', ordering: '', status: 1, information_is_complete: true };
   loadingdata: boolean;
   merchants: Array<any> = [];
   searchText;
   statusFilter: boolean;

   @Output() merchantSelectedEvent = new EventEmitter();

   constructor(private merchantsService: MerchantsService, private dialog: MatDialog) { }

   ngOnInit(): void {
     this.getMerchants();
   }


   selectMerchant(merchant) {
     this.merchantSelectedEvent.emit(merchant);
   }

   showList(value) {
     this.params.status = value;
     this.getMerchants();
   }


   showinfoIsComplete(value) {
     this.params.information_is_complete = value;
     this.getMerchants();
   }


   getMerchants() {
     this.loadingdata = true;
     this.merchantsService.getMerchants(this.params)
       .subscribe((data: any) => {
         this.loadingdata = false;
         this.merchants = data.results;
         this.length = data.count;
         this.pageIndex = this.params.page - 1;
         this.pageSize = this.params.limit;
         console.log('Merchants', this.merchants);
       }, error => {
         this.loadingdata = false;
       });
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

   ordenamiento(value: string) {
     this.params.ordering = value;
     this.getMerchants();
   }
   // METHOD PAGINATOR
   getPages(e): PageEvent {
     if (this.merchants.length === 0) {
       this.pageSize = 25;
       this.pageIndex = 0;
       return;
     }
     this.pageIndex = e.pageIndex;
     this.params.limit = e.pageSize;
     this.params.page = e.pageIndex + 1;
     this.params.offset = this.params.limit * e.pageIndex + 1;
     this.getMerchants();
   }
}
