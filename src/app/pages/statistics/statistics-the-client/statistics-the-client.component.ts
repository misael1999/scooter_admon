import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics-the-client',
  templateUrl: './statistics-the-client.component.html',
  styleUrls: ['./statistics-the-client.component.scss']
})
export class StatisticsTheClientComponent implements OnInit {
  fecha = new Date();

  constructor() { }

  ngOnInit(): void {
  }

}
