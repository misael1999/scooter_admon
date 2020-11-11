import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-zones-list',
  templateUrl: './zones-list.component.html',
  styleUrls: ['./zones-list.component.scss']
})
export class ZonesListComponent implements OnInit {

  @Input() zones = [];

  constructor() { }

  ngOnInit(): void {
  }

}
