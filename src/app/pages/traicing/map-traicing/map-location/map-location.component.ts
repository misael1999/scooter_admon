import { AfterViewInit } from '@angular/core';
import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import * as L from 'leaflet';
import { Marker } from 'leaflet';

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
  // google maps zoom level
  //  currentMarker: Marker = {
  //    lat: 18.462859841665864,
  //    lng: -97.39279966871719,
  //    draggable: false
  //  };


  // initial center position for the map
  zoom = 14;
  lat = 18.462859841665864;
  lng = -97.39279966871719;


  constructor() {
  }


  ngAfterViewInit(): void {
    this.initMap();
    this.makeCapitalMarkers(this.map);
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
      // market.bindPopup(popuText).openPopup();
      var market = new L.Marker(markerList);
      map.addLayer(market);

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
    tiles.addTo(this.map);
  }
}