import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MerchantsService } from 'src/app/services/merchants.service';
import Swal from 'sweetalert2';
import { ValidationForms } from 'src/app/utils/validations-forms';

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.scss']
})
export class MerchantListComponent extends ValidationForms implements OnInit {
  @Input() merchants;
  @Input() params;
  @Output() reloadMerchants = new EventEmitter<boolean>();


  constructor(private merchantsService: MerchantsService) {
    super();
  }

  ngOnInit(): void {
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


  async disabledMerchant(idMerchant) {
    const confirmation = await this.showMessageConfirm('De bloquear al comercio');
    if (!confirmation.value) { return; }

    this.merchantsService.deleteMerchant(idMerchant)
      .subscribe((data) => {
        this.showSwalMessage('Repartidor bloqueado correctamente');
        this.reloadMerchants.emit(true);
      }, error => {
        this.showSwalMessage(error.errors.message, 'error');
      });
  }

  async enableMerchant(idMerchant) {
    const confirmation = await this.showMessageConfirm('De desbloquear al repartidor');
    if (!confirmation.value) { return; }

    // this.merchantsService.unlockMerchant(idMerchant)
    //   .subscribe((data) => {
    //     this.showSwalMessage('Repartidor desbloqueado correctamente');
    //     this.reloadMerchants.emit(true);
    //   }, error => {
    //     this.showSwalMessage(error.errors.message, 'error');
    //   });
  }



  openOrClose(isOpen, merchantId) {
    console.log(isOpen);
    console.log(merchantId);
    this.merchantsService.opeOrcloseMerchant(merchantId, isOpen)
      .subscribe((data) => {
      }, error => {
        alert('Ha ocurrido un error al cerrar el comercio');
      });
  }

}
