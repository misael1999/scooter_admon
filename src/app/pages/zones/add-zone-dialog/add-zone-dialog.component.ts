import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ZonesService } from 'src/app/services/zones.service';
import { ValidationForms } from 'src/app/utils/validations-forms';

@Component({
  selector: 'app-add-zone-dialog',
  templateUrl: './add-zone-dialog.component.html',
  styleUrls: ['./add-zone-dialog.component.scss']
})
export class AddZoneDialogComponent extends ValidationForms implements OnInit {

  zoneForm: FormGroup;
  zone: any;
  kmlFile: File;
  loadingSave: boolean;
  typeZone: any;

  paths = [];

  // google maps zoom level
  zoom = 14;

  // initial center position for the map
  lat = 18.462859841665864;
  lng = -97.39279966871719;

  constructor(private fb: FormBuilder,
    private zoneService: ZonesService,
    public dialogRef: MatDialogRef<AddZoneDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super();
    if (data.zone) {
      this.zone = data.zone;
      this.buildUpdateForm(this.zone);
    } else {
      this.buildForm();
    }
  }

  ngOnInit(): void {
  }

  buildForm() {
    this.zoneForm = this.fb.group(
      {
        name: [null, Validators.required],
        description: [null, Validators.required],
        type: ['1', Validators.required],
        base_rate_price: [null],
        from_hour: [null],
        to_hour: [null],
        has_price: [null],
        has_schedule: [null],
      }
    );
  }

  buildUpdateForm(zone) {
    this.zoneForm = this.fb.group(
      {
        name: [null, Validators.required],
        description: [null, Validators.required],
        type: ['1', Validators.required],
        base_rate_price: [null],
        from_hour: [null],
        to_hour: [null],
        has_price: [null],
        has_schedule: [null],
      }
    );
  }

  selectFile(event) {
    this.kmlFile = event.target.files[0];
    if (this.kmlFile) {
      this.parseDocument(this.kmlFile);
    }
  }

  changeTypeZone(value) {
    if (value == '1') {

    }
  }


  createZone() {

    if (this.zoneForm.invalid) {
      this.zoneForm.markAllAsTouched();
      return;
    }

    if (this.kmlFile == null) {
      this.showSwalMessage('Selecciona el archivo KML', 'info');
      return;
    }

    const zone = this.zoneForm.value;
    // this.loadingSave = true;

    if (this.zone) {
      // ======= Actualizar repartidor ========
      this.updateZone(this.zone.id, zone);
    } else {
      const formData: FormData = new FormData();
      formData.append('kml_file', this.kmlFile, this.kmlFile.name);
      for (const property in zone) {
        formData.append(property, zone[property]);
      }
       
      // ======= Agregar repartidor ======== 
      this.addZone(formData);
    }

  }

  addZone(zone) {
    this.zoneService.addZone(zone)
      .subscribe((data) => {

        this.showSwalMessage('Zona agregada correctamente');
        this.loadingSave = false;
        this.dialogRef.close(true);

      }, error => {
        this.showSwalMessage(error.errors.message, 'error');
        this.loadingSave = false;
      });
  }

  updateZone(zoneId, zone) {
    if (zone.password == null) {
      delete zone.password;
    }
    this.zoneService.updateZone(zoneId, zone)
      .subscribe((data) => {

        this.showSwalMessage('Repartidor actualizado correctamente');
        this.loadingSave = false;
        this.dialogRef.close(true);

      }, error => {
        this.showSwalMessage(error.errors.message, 'error');
        this.loadingSave = false;
      });
  }

  parseDocument(file) {
    let fileReader = new FileReader()
    fileReader.onload = async (e: any) => {
      let result = await this.extractGoogleCoords(e.target.result)

      //Do something with result object here
      this.paths = result.polygons;

    }
    fileReader.readAsText(file)
  }

  async extractGoogleCoords(plainText) {
    let parser = new DOMParser()
    let xmlDoc = parser.parseFromString(plainText, "text/xml")
    let googlePolygons = []
    let googleMarkers = []

    if (xmlDoc.documentElement.nodeName == "kml") {

      for (const item of xmlDoc.getElementsByTagName('Placemark') as any) {
        let placeMarkName = item.getElementsByTagName('name')[0].childNodes[0].nodeValue.trim()
        let polygons = item.getElementsByTagName('LineString')
        let markers = item.getElementsByTagName('Point')

        /** POLYGONS PARSE **/        
        for (const polygon of polygons) {
          let coords = polygon.getElementsByTagName('coordinates')[0].childNodes[0].nodeValue.trim()
          let points = coords.split(" ")

          let googlePolygonsPaths = []
          for (const point of points) {
            let coord = point.split(",")
            googlePolygonsPaths.push({ lat: +coord[1], lng: +coord[0] })
          }
          googlePolygons.push(googlePolygonsPaths)
        }

        /** MARKER PARSE **/    
        for (const marker of markers) {
          var coords = marker.getElementsByTagName('coordinates')[0].childNodes[0].nodeValue.trim()
          let coord = coords.split(",")
          googleMarkers.push({ lat: +coord[1], lng: +coord[0] })
        }
      }
    } else {
      throw "error while parsing"
    }

    return { markers: googleMarkers, polygons: googlePolygons }

  }

}
