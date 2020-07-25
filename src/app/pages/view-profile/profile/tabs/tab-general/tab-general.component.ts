import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataLayerManager } from '@agm/core';

@Component({
  selector: 'app-tab-general',
  templateUrl: './tab-general.component.html',
  styleUrls: ['./tab-general.component.scss']
})
export class TabGeneralComponent implements OnInit {

  station: any;
  binaryString;
  imageTemp;
  @ViewChild('myInput')
  myInputVariable: ElementRef;
  services = [];
  generalInfoForm: FormGroup;
  loadingSaveInfo = false;
  changeImage = false;

  constructor(private profileService: ProfileService,
    private fb: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.station = this.profileService.station;
    this.services = this.station.services;
    this.buildGeneralForm();
  }

  onFileSelected(evt: any) {
    const file = evt.target.files[0];

    if (!file) {
      this.imageTemp = null;
      return;
    }

    if (file.type.indexOf('image') < 0) {

      this.myInputVariable.nativeElement.value = '';
      this.showMessageErrorSwal('El archivo seleccionado no es una imagen');
      this.binaryString = null;
      return;
    }

    const reader = new FileReader();
    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
    this.changeImage = true;
  }

  handleReaderLoaded(e) {
    this.binaryString = 'data:image/png;base64,' + btoa(e.target.result);
  }

  showMessageErrorSwal(message) {
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: message,
      confirmButtonColor: '#e74a3b',
    });
  }

  buildGeneralForm() {
    this.generalInfoForm = this.fb.group({
      phone_number: [this.station.phone_number, Validators.required],
      contact_person: [this.station.contact_person, Validators.required],
    })
  }

  saveGeneralInfo() {

    if (this.generalInfoForm.invalid) {
      this.generalInfoForm.markAllAsTouched();
      return;
    }

    const info = this.generalInfoForm.value;

    if (this.binaryString != null) {
      info.picture = this.binaryString;
    }
    
    this.loadingSaveInfo = true;
    
    this.profileService.updateStation({general: info})
    .subscribe((data: any) => {
      this.showMessageSuccess('Información actualizada correctamente');
      this.loadingSaveInfo = false;
      localStorage.setItem('station', JSON.stringify(data.data));
      location.reload();
      this.changeImage = false;
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
