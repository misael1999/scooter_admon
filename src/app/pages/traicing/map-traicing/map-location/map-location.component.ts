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
  name?: string;
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

  myIcon = L.icon({
    iconUrl: 'assets/img/collection.svg',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
  });


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

  polygonPoints = [
    [37.786617, -122.404654],
    [37.797843, -122.407057],
    [37.798962, -122.398260],
    [37.794299, -122.395234]];


  constructor(private zonesService: ZonesService) {
  }


  ngAfterViewInit(): void {
    this.initMap();
    this.makeCapitalMarkers(this.map);
    this.makeCapitalZone(this.map);
  }

  ngOnInit(): void {
    this.getArea();
    // var mymap = L.map('mapid').setView([51.505, -0.09], 13);
    // var mymap = L.map('mapid').setView([51.505, -0.09], 13);
  }

  makeCapitalMarkers(map: L.map): void {
    for (const m of this.markerList) {
      let lat = m.lat;
      let lon = m.lng;
      let popuText = m.name;
      let markerList = new L.LatLng(lat, lon);
      let market = new L.Marker(markerList, { icon: this.myIcon }).bindPopup(popuText);
      map.addLayer(market);
    }
  }


  makeCapitalZone(map: L.map): void {
    for (const m of this.paths) {
      let lat = m.lat;
      let lon = m.lng;
      let zona = new L.polygon(lat, lon).addTo(map);

    }
  }







  // METHODS FOR CLICK
  ngOnChanges(_changes: SimpleChanges): void {
    if (this.coordinates) {
      this.lat = this.coordinates.lat;
      this.lng = this.coordinates.lng;
      this.makeCapitalMarkers(this.map);
      this.map.setView([this.lat, this.lng], 17);
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
    tiles.addTo(this.map);
  }


  // ZONAS POLY GENERAL
  getArea() {
    this.zonesService.getAreaByStation()
      .subscribe((data: any) => {
        this.area = data;
        this.setPolygon(data.poly.coordinates);
      }, error => {
      });
  }
  setPolygon(coordinates) {
    for (const points of coordinates) {
      for (const coordinate of points) {
        this.paths.push({ lat: coordinate[1], lng: coordinate[0] });
      }
    }
    return this.paths;
  }


}
