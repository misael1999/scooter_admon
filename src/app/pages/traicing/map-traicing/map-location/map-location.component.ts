import { AfterViewInit } from '@angular/core';
import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import * as L from 'leaflet';
import { icon, Marker } from 'leaflet';

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

  myIcon = L.divIcon({
    iconSize: new L.Point(0, 0),
    html: '<div id="div1" class="fas "></div>'
  });

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
      const lat = m.lat;
      const lon = m.lng;
      console.log(lon, lat);
      // const marker = L.marker([lon, lat]).addTo(map);
      const marker = L.marker([lon, lat], { icon: this.myIcon }).addTo(map).bindPopup("fa-map-marker-alt");
      console.log(marker);
    }
  }


  ngOnChanges(changes: SimpleChanges): void {
    // if (this.coordinates) {
    //   this.lat = this.coordinates.lat;
    //   this.lng = this.coordinates.lng;
    //   console.log(this.lat, this.lng);
    //   this.zoom = 17;
    // }
    // const marker = L.marker([lon, lat]).addTo(map);
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