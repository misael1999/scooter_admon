import { Component, Input, OnInit } from '@angular/core';
import { MerchantsService } from 'src/app/services/merchants.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.scss']
})
export class MerchantListComponent implements OnInit {
  @Input() merchants;
  @Input() params;

  constructor(private merchantsService: MerchantsService) { }

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
