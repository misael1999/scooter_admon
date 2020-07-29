import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { FormGroup } from '@angular/forms';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfigAccountService } from 'src/app/services/config-account.service';

@Component({
  selector: 'app-tab-promotion',
  templateUrl: './tab-promotion.component.html',
  styleUrls: ['./tab-promotion.component.scss']
})
export class TabPromotionComponent implements OnInit {

  loadingSaveInfo: boolean;
  isChangeConfig: boolean;
  free_orders_activated: boolean;
  schedule;
  station;

  constructor(private profileService: ProfileService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.station = this.profileService.station;
    this.free_orders_activated = this.station.free_orders_activated;
    this.schedule = {
      from_hour_free_order: this.station.from_hour_free_order || '11:00:00',
      to_hour_free_order: this.station.to_hour_free_order || '14:00:00'
    }
  }

  async changeSlideAllow(e) {
    this.free_orders_activated = e.source.checked;
    if (e.source.checked == false) {
      // this.allowCancellations = true;
      const resp = await this.showMessageConfirm('pedidos gratuitos');
      if (resp.dismiss) {
        this.free_orders_activated = !this.free_orders_activated;
        return;
      }
    }
    this.isChangeConfig = true;
  }


  saveConfigInfo() {

    this.loadingSaveInfo = true;
    const config = {
      free_orders_activated: this.free_orders_activated,
      from_hour_free_order: this.schedule.from_hour_free_order,
      to_hour_free_order: this.schedule.to_hour_free_order
    };
    this.profileService.updateStation({ config })
      .subscribe((data: any) => {
        this.showMessageSuccess('Configuración actualizada correctamente');
        this.loadingSaveInfo = false;
        localStorage.setItem('station', JSON.stringify(data.data));
        this.isChangeConfig = false;
        location.reload();
      }, error => {
        this.showMessageError(error.errors.message);
        this.loadingSaveInfo = false;
      });

  }

  addSchedule(schedule) {
    this.isChangeConfig = true;
    this.schedule = schedule;
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

}
