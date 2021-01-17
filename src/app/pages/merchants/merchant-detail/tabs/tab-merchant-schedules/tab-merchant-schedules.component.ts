import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-merchant-schedules',
  templateUrl: './tab-merchant-schedules.component.html',
  styleUrls: ['./tab-merchant-schedules.component.scss']
})
export class TabMerchantSchedulesComponent implements OnInit {

  @Input() merchants;

  constructor() { }

  ngOnInit(): void {
  }

}
