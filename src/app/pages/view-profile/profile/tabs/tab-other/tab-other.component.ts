import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tab-other',
  templateUrl: './tab-other.component.html',
  styleUrls: ['./tab-other.component.scss']
})
export class TabOtherComponent implements OnInit {
  // Step Config
  assignDeliveryManually = false;
  allowCancellations = false;
  loadingUpdateConfig: boolean;
  station;
  loadingSaveInfo = false;
  isChangeConfig;

  otherForm: FormGroup;


  constructor(private profileService: ProfileService,
    private snackBar: MatSnackBar, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.station = this.profileService.station;
    this.assignDeliveryManually = this.station.assign_delivery_manually;
    this.allowCancellations = this.station.allow_cancellations;
    this.buildOtherForm();
  }

  async changeSlide(e) {
    this.assignDeliveryManually = e.source.checked;
    if (e.source.checked == false) {
      // this.assignDeliveryManually = true;
      const resp = await this.showMessageConfirm('asignación manual');
      if (resp.dismiss) {
        this.assignDeliveryManually = !this.assignDeliveryManually;
        return;
      }
    }
    this.isChangeConfig = true;
  }

  async changeSlideAllow(e) {
    this.allowCancellations = e.source.checked;
    if (e.source.checked == false) {
      // this.allowCancellations = true;
      const resp = await this.showMessageConfirm('permitir cancelaciones');
      if (resp.dismiss) {
        this.allowCancellations = !this.allowCancellations;
        return;
      }


    }
    this.isChangeConfig = true;
  }

  saveConfigInfo() {
    if (this.otherForm.invalid) {
      return;
    }
    this.loadingSaveInfo = true;
    const config = {
      allow_cancellations: this.allowCancellations,
      assign_delivery_manually: this.assignDeliveryManually,
      cancellation_policies: 'Sin politicas',
      quantity_safe_order: this.otherForm.get('quantity_safe_order').value
    };
    this.profileService.updateStation({ config })
      .subscribe((data: any) => {
        this.showMessageSuccess('Configuración actualizada correctamente');
        this.loadingSaveInfo = false;
        localStorage.setItem('station', JSON.stringify(data.data));
        this.isChangeConfig = false;
        this.otherForm.markAsPristine();
        location.reload();
      }, error => {
        this.showMessageError(error.errors.message);
        this.loadingSaveInfo = false;
      });

  }

  buildOtherForm() {
    this.otherForm = this.fb.group({
      quantity_safe_order: [this.station.quantity_safe_order, Validators.required]
    });
  }

  showMessageSuccess(message) {
    this.snackBar.open(message, 'Aceptar', {
      duration: 3000,
      panelClass: ['main-snackbar']
    });
  }

  showMessageError(message) {
    this.snackBar.open(message, 'Aceptar', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }


  showMessageConfirm(message: string): Promise<SweetAlertResult> {
    return Swal.fire({
      title: '¿Estas seguro?',
      text: "Desactivaras " + message,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, desactivalo'
    });
  }

  // Metodos para validar
  isFieldInvalid(form: FormGroup, field: string) {
    return (
      (!form.get(field).valid && form.get(field).touched)
    );
  }
  isFieldValid(form: FormGroup, field: string) {
    return (
      (form.get(field).valid && form.get(field).touched)
    );
  }
  isFieldHasError(form: FormGroup, field: string, error: string) {
    return (
      (form.get(field).hasError(error))
    );
  }

  saveConfig() {
    /* if (!(this.validateStepByIndex(this.currentIndex))) {
      return;
    }
    this.loadingUpdateConfig = true;
    this.configService.updateInfo(this.stationConfig)
      .subscribe((data: any) => {
        localStorage.setItem('information_is_complete', 'true');
        this.loadingUpdateConfig = false;
        this.router.navigate(['/dashboard']);
      }, (err) => {
        this.loadingUpdateConfig = false;
        this.alertService.openErrorDialog(null, 'Oppss..', err.errors.message);
      }); */
  }

}
