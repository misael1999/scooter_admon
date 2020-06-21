import { Component, OnInit } from '@angular/core';
import { StationModel } from 'src/app/models/station.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  station: StationModel;

  constructor() {
    this.station = JSON.parse(localStorage.getItem('station'));
  }

  ngOnInit(): void {
  }

}
