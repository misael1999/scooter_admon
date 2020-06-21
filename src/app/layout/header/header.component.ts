import { Component, OnInit } from '@angular/core';
import { StationModel } from 'src/app/models/station.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  station: StationModel;

  constructor() {
    this.station = JSON.parse(localStorage.getItem('station'));
  }

  ngOnInit(): void {
  }

}
