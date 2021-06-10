import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ValidationForms } from 'src/app/utils/validations-forms';
import { MerchantsService } from '../../../services/merchants.service';

@Component({
  selector: 'app-merchants-add',
  templateUrl: './merchants-add.component.html',
  styleUrls: ['./merchants-add.component.scss']
})
export class MerchantsAddComponent extends ValidationForms implements OnInit {
  merchantForm: FormGroup;
  merchant: any;
  categories: any;
  loadingSave: boolean;

  constructor(
    private fb: FormBuilder,
    private merchantsService: MerchantsService,
    public dialogRef: MatDialogRef<MerchantsAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
    if (data.merchant) {
      this.merchant = data.merchant;
      this.buildUpdateForm(this.merchant);
    } else {
      this.buildFormAdd();
    }
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.merchantsService.getCategories()
      .subscribe((data: any) => {
        this.categories = data.results;
      }, error => {
        alert('No es posible obtener categorias');
      });
  }

  createMerchant() {
    if (this.merchantForm.invalid) {
      this.merchantForm.markAllAsTouched();
      return;
    }
    const merchant = this.merchantForm.value;
    this.loadingSave = true;
    if (this.merchant) {
      // ======= Update merchant ========
      this.updateMerchant(this.merchant.id, merchant);
    } else {
      // ======= Add merchant ========
      this.addMerchant(merchant);
    }
  }


  // Methods for add merchant
  addMerchant(merchant) {
    this.merchantsService.createMerchant(merchant)
      .subscribe((data) => {
        this.showSwalMessage('Comercio agregado correctamente');
        this.loadingSave = false;
        this.dialogRef.close(true);
      }, error => {
        this.showSwalMessage(error.errors.message, 'error');
        this.loadingSave = false;
      });
  }
  buildFormAdd() {
    this.merchantForm = this.fb.group(
      {
        username: [null, Validators.required],
        password: [null, Validators.required],
        merchant_name: [null, Validators.required],
        contact_person: [null, Validators.required],
        phone_number: [null, Validators.required],
        is_delivery_by_store: [false],
        category_id: [null, Validators.required],
        subcategory_id: [null],
        type_menu: ['1'],
      }
    );
  }


  // Methods for update
  updateMerchant(merchantId, merchant) {
  }
  buildUpdateForm(merchant) {
    this.merchantForm = this.fb.group(
      {
        name: [merchant.username, Validators.required],
        last_name: [merchant.merchant_name, Validators.required],
      }
    );
  }
}
