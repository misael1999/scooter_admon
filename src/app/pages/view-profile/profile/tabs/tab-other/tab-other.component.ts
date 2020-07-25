import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

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


  constructor(private profileService: ProfileService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.station = this.profileService.station;
    this.assignDeliveryManually = this.station.assign_delivery_manually;
    this.allowCancellations = this.station.allow_cancellations;
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
    this.loadingSaveInfo = true;
    const config = {
      allow_cancellations: this.allowCancellations,
      assign_delivery_manually: this.assignDeliveryManually,
      cancellation_policies: 'Sin politicas'
    };
    this.profileService.updateStation({config})
    .subscribe((data: any) => {
      this.showMessageSuccess('Configuración actualizada correctamente');
      this.loadingSaveInfo = false;
      localStorage.setItem('station', JSON.stringify(data.data));
      this.isChangeConfig = false;
      // location.reload();
    }, error => {
        this.showMessageError(error.errors.message);
        this.loadingSaveInfo = false;
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
