import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MerchantsService } from 'src/app/services/merchants.service';
import { MerchantsAddComponent } from '../merchants-add/merchants-add.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
// import { stat } from 'fs';

@Component({
  selector: 'app-main-merchant',
  templateUrl: './main-merchant.component.html',
  styleUrls: ['./main-merchant.component.scss']
})
export class MainMerchantComponent implements OnInit {

  loadingMerchants: boolean;
  merchants: Array<any> = [];
  searchText;

  // MatPaginator Inputs
  length = 100;
  pageSize = 25;
  pageSizeOptions: number[] = [25, 50, 75, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  statusFilter: boolean;

  // Parametros para el paginado
  params = { limit: 25, offset: 0, search: '', ordering: 'created', status: 1, information_is_complete: true };

  constructor(private merchantsService: MerchantsService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getMerchants();
  }

  dialogAddMerchant(merchant = null) {
    const dialogRef = this.dialog.open(MerchantsAddComponent, {
      disableClose: true,
      width: '90%',
      data: { merchant }
    });

    dialogRef.afterClosed()
      .subscribe((data: any) => {
        if (data) {
          this.getMerchants();
        }
      });
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
    this.loadingMerchants = true;
    this.merchantsService.getMerchants(this.params)
      .subscribe((data: any) => {
        this.loadingMerchants = false;
        this.merchants = data.results;
        this.length = data.count;
      }, error => {
        this.loadingMerchants = false;
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
    this.searchText = "";
    this.getMerchants();
  }


  ordenamiento(value: string) {
    this.params.ordering = value;
    this.getMerchants();
  }

  deleteMerchant(id, nombre) {
    Swal.fire({
      title: 'Bloquear',
      text: `Esta seguro de bloquear a ${nombre}`,
      type: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Bloquear',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then(resp => {
      if (resp.value) {
        this.merchantsService.deleteMerchant(id)
          .subscribe(data => {
            Swal.fire({
              title: 'Bloqueado',
              type: 'success',
              text: 'El comercio ha sido bloqueado',
              timer: 2000
            });
          });
      }
    });
  }


  // Metodo paginator
  getPages(e): PageEvent {

    if (this.merchants.length === 0) {
      this.pageSize = 25;
      return;
    }

    this.params.limit = e.pageSize;
    this.params.offset = this.params.limit * e.pageIndex;
    this.getMerchants();
  }

}
