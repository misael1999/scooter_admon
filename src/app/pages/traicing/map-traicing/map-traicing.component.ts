import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map-traicing',
  templateUrl: './map-traicing.component.html',
  styleUrls: ['./map-traicing.component.scss']
})

export class MapTraicingComponent implements OnInit {
  markerList: Array<any>;

  constructor() { }

  ngOnInit(): void {

  }

  getMarkers (markerList) {
    this.markerList = markerList;

  }

}
