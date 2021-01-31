import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MerchantsService } from 'src/app/services/merchants.service';
import { ValidationForms } from 'src/app/utils/validations-forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-merchant-detail',
  templateUrl: './merchant-detail.component.html',
  styleUrls: ['./merchant-detail.component.scss']
})
export class MerchantDetailComponent extends ValidationForms implements OnInit {
  merchantId;
  merchant;
  loadingInfo;

  constructor(private activatedRoute: ActivatedRoute, private merchantsService: MerchantsService) {
    super();
    this.activatedRoute.params.subscribe((params) => {
      this.merchantId = params['id'];
      this.getMerchant(this.merchantId);
    });
  }

  ngOnInit(): void {
  }

  
  deleteMerchant() {
    Swal.fire({
      title: 'Bloquear',
      text: 'Esta seguro de bloquear a ',
      type: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Bloquear',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then(resp => {
      if (resp.value) {
        this.merchantsService.deleteMerchant(this.merchantId)
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


  getMerchant(merchantId) {
    this.loadingInfo = true;
    this.merchantsService.getMerchantById(merchantId).subscribe(
      (data: any) => {
        this.loadingInfo = false;
        this.merchant = data;
        this.merchantsService.merchantId = this.merchant;
        console.log(this.merchant);
      }, error => {
        this.loadingInfo = false;
        this.showSwalMessage("Error al obtener información del comercio", 'error');
      });
  }

}
