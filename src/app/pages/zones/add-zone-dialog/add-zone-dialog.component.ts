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
  has_price: boolean;
  has_schedule: boolean;

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
      this.setShapeInMap(data.zone);
      this.buildUpdateForm(data.zone);
    } else {
      this.buildForm();
    }
  }

  ngOnInit(): void {
  }

  setShapeInMap(zone) {
    const coordinates = zone.poly.coordinates;
    if (zone.poly.type == 'LineString') {
      this.setLineString(coordinates);
      return;
    }
    this.setPolygon(coordinates);
  }


  buildForm() {
    this.zoneForm = this.fb.group(
      {
        name: [null, Validators.required],
        description: [null, Validators.required],
        type_id: ['', Validators.required],
        base_rate_price: [null],
        from_hour: [null],
        to_hour: [null],
        has_schedule: [null],
      }
    );
  }

  buildUpdateForm(zone) {
    this.zoneForm = this.fb.group(
      {
        name: [zone.name, Validators.required],
        description: [zone.description, Validators.required],
        type_id: [zone.type_id, Validators.required],
        base_rate_price: [zone.base_rate_price],
        from_hour: [zone.from_hour],
        to_hour: [zone.to_hour],
        has_schedule: [zone.has_schedule],
      }
    );
    this.has_schedule = zone.has_schedule;
    this.typeZone = zone.type_id.toString();
  }

  checkboxSchedule(value) {
    this.has_schedule = value;
  }

  selectFile(event) {
    this.kmlFile = event.target.files[0];
    if (this.kmlFile) {
      this.parseDocument(this.kmlFile);
    }
  }

  changeTypeZone(value) {
    this.typeZone = value;
  }


  createZone() {

    if (this.zoneForm.invalid) {
      this.zoneForm.markAllAsTouched();
      return;
    }

    const zone = this.zoneForm.value;
    const formData: FormData = new FormData();

    // Add kml
    if (this.kmlFile) {
      formData.append('kml_file', this.kmlFile, this.kmlFile.name);
    }

    if (!this.validTypeZone(zone)) {
      return false;
    }

    for (const property in zone) {
      formData.append(property, zone[property]);
    }

    if (this.zone) {
      // ======= Actualizar zona ========
      this.updateZone(this.zone.id, formData);

    } else {

      if (this.kmlFile == null) {
        this.showSwalMessage('Selecciona el archivo KML', 'info');
        return;
      }

      // ======= Agregar zona ======== 
      this.addZone(formData);
    }

  }

  validTypeZone(zone): boolean {
    if (this.typeZone == '1') {
      delete zone.base_rate_price;
      if (this.has_schedule && (zone.from_hour == null || zone.to_hour == null)) {
        this.showSwalMessage('Ingresa los horarios', 'info');
        return false;
      } else {
        delete zone.from_hour;
        delete zone.to_hour;
        return true;
      }
    }
    if (this.typeZone == '2') {
      delete zone.from_hour;
      delete zone.to_hour;
      delete zone.base_rate_price;
      delete zone.has_schedule;
      return true;
    }
    if (this.typeZone == '3') {
      if (zone.base_rate_price == null) {
        this.showSwalMessage('Ingresa la tarifa', 'info');
        return false;
      }
      if (this.has_schedule && (zone.from_hour == null || zone.to_hour == null)) {
        this.showSwalMessage('Ingresa los horarios', 'info');
        return false;
      }
    }

    return true;
  }

  addZone(zone) {
    this.loadingSave = true;
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
    this.loadingSave = true;
    this.zoneService.updateZone(zoneId, zone)
      .subscribe((data) => {

        this.showSwalMessage('zona actualizada correctamente');
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

  setPolygon(coordinates) {
    for (const points of coordinates) {
      for (const coordinate of points) {
        this.paths.push({ lat: coordinate[1], lng: coordinate[0] });
      }
    }
  }

  setLineString(coordinates) {
    for (const points of coordinates) {

      this.paths.push({ lat: points[1], lng: points[0] });

    }
  }

  async extractGoogleCoords(plainText) {
    let parser = new DOMParser()
    let xmlDoc = parser.parseFromString(plainText, "text/xml")
    let googlePolygons = []
    let googleLine = []
    let googleMarkers = []

    if (xmlDoc.documentElement.nodeName == "kml") {

      for (const item of xmlDoc.getElementsByTagName('Placemark') as any) {
        let placeMarkName = item.getElementsByTagName('name')[0].childNodes[0].nodeValue.trim()
        let polygons = item.getElementsByTagName('Polygon')
        let lineString = item.getElementsByTagName('LineString')
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
        /** LINESTRING PARSE **/
        for (const line of lineString) {
          let coords = line.getElementsByTagName('coordinates')[0].childNodes[0].nodeValue.trim()
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

    if (googlePolygons.length == 0) {
      googlePolygons = googleLine;
    }

    return { markers: googleMarkers, polygons: googlePolygons, lines: googleLine }

  }

}
