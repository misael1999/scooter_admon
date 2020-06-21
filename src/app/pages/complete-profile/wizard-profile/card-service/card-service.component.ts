import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ServiceModel } from 'src/app/models/service.model';

@Component({
  selector: 'app-card-service',
  templateUrl: './card-service.component.html',
  styleUrls: ['./card-service.component.scss']
})
export class CardServiceComponent implements OnInit {

  constructor() { }

  @Input() service: ServiceModel;
  @Input() index: number;
  checked;

  @Output()
  addRateService = new EventEmitter<object>();


  ngOnInit(): void {
  }

  selectService(event) {
    this.checked = event.checked;
    this.addRateService.emit({
      service_name: this.service.name,
      service_id: event.value,
      checked: event.checked
    });
  }

}
