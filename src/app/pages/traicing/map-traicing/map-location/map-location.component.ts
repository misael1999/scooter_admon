import { AfterViewInit } from '@angular/core';
import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import * as L from 'leaflet';
import { Marker } from 'leaflet';
import { ZonesService } from 'src/app/services/zones.service';

// just an interface for type safety.
export interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  name?: string
}

@Component({
  selector: 'app-map-location',
  templateUrl: './map-location.component.html',
  styleUrls: ['./map-location.component.scss']
})
export class MapLocationComponent implements AfterViewInit, OnInit, OnChanges {
  private map;
  @Input() markerList;
  @Input() coordinates;
  zones: Array<any> = [];

  // google maps zoom level
  //  currentMarker: Marker = {
  //    lat: 18.462859841665864,
  //    lng: -97.39279966871719,
  //    draggable: false
  //  };

  paths = [];
  area;
  // initial center position for the map
  zoom = 14;
  lat = 18.462859841665864;
  lng = -97.39279966871719;

  // polygonPoints = [
  //   [18.46487549225484, -97.39538524016072],
  //   [18.46357553293412, -97.39618628331289],
  //   [18.46163096332963, -97.39558290090773],
  //   [18.46070646705935, -97.39471660178855],
  //   [18.46029851724682, -97.39250273493836],
  //   [18.46042674789116, -97.39050539857001],
  //   [18.46149487815105, -97.3896366608307],
  //   [18.46471899268761, -97.39118998597411],
  //   [18.46471899268761, -97.39118998597411],
  //   [18.46531275485555, -97.39458159674882],
  //   [18.46487549225484, -97.39538524016072],
  // ];


  constructor(private zonesService: ZonesService) {
  }


  ngAfterViewInit(): void {
    this.initMap();
    this.makeCapitalMarkers(this.map);
    this.makeCapitalPoly(this.map);
    this.getArea();
  }

  ngOnInit(): void {
    // var mymap = L.map('mapid').setView([51.505, -0.09], 13);
    // var mymap = L.map('mapid').setView([51.505, -0.09], 13);
    // console.log(this.markerList);
  }

  makeCapitalMarkers(map: L.map): void {
    for (const m of this.markerList) {
      console.log(this.markerList);
      var lat = m.lat;
      var lon = m.lng;
      var popuText = m.name;
      console.log(lon, lat, popuText);
      var markerList = new L.LatLng(lat, lon);
      var market = new L.Marker(markerList);
      map.addLayer(market);
    }
  }
  makeCapitalPoly(map: L.map): void {
    for (const m of this.paths) {
      console.log(this.paths);
      var lat = m.lat;
      var lon = m.lng;
      var markerList = new L.LatLng(lat, lon);
      var poly = L.polygon(markerList).addTo(map);
    }
  }





  ngOnChanges(_changes: SimpleChanges): void {
    if (this.coordinates) {
      this.lat = this.coordinates.lat;
      this.lng = this.coordinates.lng;
      this.makeCapitalMarkers(this.map);
      this.map.setView([this.lat, this.lng], 16)
    }
  }



  private initMap(): void {
    this.map = L.map('map', {
      center: [this.lat, this.lng],
      zoom: 14
    });
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    var poly = L.polygon(this.paths).addTo(this.map);
    tiles.addTo(this.map);

  }


  // ZONAS POLY
  getArea() {
    this.zonesService.getAreaByStation()
      .subscribe((data: any) => {
        this.area = data;
        console.log(this.area);
        this.setPolygon(data.poly.coordinates);
      }, error => {
        console.log('Erro');
      });
  }
  setPolygon(coordinates) {
    // console.log(this.coordinates);
    for (const points of coordinates) {
      for (const coordinate of points) {
        // console.log(coordinates);
        this.paths.push({ lat: coordinate[1], lng: coordinate[0] });
        console.log(this.paths);
      }
    }
  }


}