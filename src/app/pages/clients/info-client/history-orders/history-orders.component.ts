import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-history-orders',
  templateUrl: './history-orders.component.html',
  styleUrls: ['./history-orders.component.scss']
})
export class HistoryOrdersComponent implements OnInit {

  @Input() customer;

  constructor() { }

  ngOnInit(): void {
  }

}
