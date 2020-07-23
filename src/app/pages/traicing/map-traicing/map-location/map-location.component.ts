import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';


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
export class MapLocationComponent implements OnInit, OnChanges {

  @Input() markerList;
  @Input() coordinates;


  // google maps zoom level
  zoom = 14;
  //  currentMarker: Marker = {
  //    lat: 18.462859841665864,
  //    lng: -97.39279966871719,
  //    draggable: false
  //  };


  // initial center position for the map
  lat = 18.462859841665864;
  lng = -97.39279966871719;

  constructor() { }

  ngOnInit(): void {
    console.log(this.markerList);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.coordinates) {
      this.lat = this.coordinates.lat;
      this.lng = this.coordinates.lng;
      this.zoom = 17;
    }
  }

}
