import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationForms } from 'src/app/utils/validations-forms';
import { MerchantsService } from '../../../../../services/merchants.service';

@Component({
  selector: 'app-tab-merchant-setting',
  templateUrl: './tab-merchant-setting.component.html',
  styleUrls: ['./tab-merchant-setting.component.scss']
})
export class TabMerchantSettingComponent extends ValidationForms implements OnInit {
  settingForm: FormGroup;
  loadingSaveInfo = false;
  merchant;

  @Input() merchatSetting;
  constructor(private merchantService: MerchantsService, private fb: FormBuilder) { super(); }

  ngOnInit(): void {
    this.merchant = this.merchantService.merchantId;
    this.buildSettingForm();

  }


  saveGeneralInfo() {

    if (this.settingForm.invalid) {
      this.settingForm.markAllAsTouched();
      return;
    }

    const info = this.settingForm.value;


    this.loadingSaveInfo = true;

    this.merchantService.updateMerchantStation(this.merchant.id, info)
      .subscribe((data: any) => {
        this.showSwalMessage('Información actualizada correctamente');
        this.loadingSaveInfo = false;
      }, error => {
        this.showSwalMessage('Error en actualizar', 'error');
      });

    // this.merchantService.opeO

    // this.MerchantsService.updateStation({general: info})
    // .subscribe((data: any) => {
    //   this.showMessageSuccess('Información actualizada correctamente');
    //   this.loadingSaveInfo = false;
    //   localStorage.setItem('station', JSON.stringify(data.data));
    //   location.reload();
    //   this.changeImage = false;
    // }, error => {
    //     this.showMessageError(error.errors.message);
    //     this.loadingSaveInfo = false;
    //   });

  }

  buildSettingForm() {
    this.settingForm = this.fb.group({
      increment_price_operating: [this.merchant.increment_price_operating, Validators.required],
      has_rate_operating: [this.merchant.has_rate_operating, Validators.required],
    });
  }

}
