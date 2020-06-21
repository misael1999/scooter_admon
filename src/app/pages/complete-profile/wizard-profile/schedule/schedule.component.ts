import { Component, OnInit, Input } from '@angular/core';
import { ScheduleModel } from 'src/app/models/schedule.model';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {

  @Input() schedule: ScheduleModel;

  constructor() { }

  ngOnInit(): void {
  }

}
