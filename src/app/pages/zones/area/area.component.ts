import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

  markerList = [];
  @Input() paths = [];

  // google maps zoom level
  zoom = 12;

  // initial center position for the map
  lat = 18.462859841665864;
  lng = -97.39279966871719;

  constructor() { }

  ngOnInit(): void {
  }

}
