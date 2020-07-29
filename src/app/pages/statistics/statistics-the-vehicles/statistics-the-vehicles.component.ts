import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics-the-vehicles',
  templateUrl: './statistics-the-vehicles.component.html',
  styleUrls: ['./statistics-the-vehicles.component.scss']
})
export class StatisticsTheVehiclesComponent implements OnInit {
  fecha = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}
