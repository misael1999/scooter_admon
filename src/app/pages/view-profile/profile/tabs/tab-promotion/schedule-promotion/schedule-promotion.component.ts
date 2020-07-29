import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ScheduleModel } from 'src/app/models/schedule.model';
import { AmazingTimePickerService } from 'amazing-time-picker';

@Component({
  selector: 'app-schedule-promotion',
  templateUrl: './schedule-promotion.component.html',
  styleUrls: ['./schedule-promotion.component.scss']
})
export class SchedulePromotionComponent implements OnInit {

  @Output() addSchedule = new EventEmitter<object>();
  @Input() schedule;

  openingHour = '11:00:00';
  closedHour = '14:00:00';

  constructor(private atp: AmazingTimePickerService) { }

  ngOnInit(): void {
  }

  selectCheckbox(event) {
    this.sendSchedule();
  }

  public openOpeningHourPicker() {
    const amazingTimePicker = this.atp.open(
      this.getConfigTimePicker(this.openingHour)
      );
    amazingTimePicker.afterClose()
      .subscribe(time => {
        this.openingHour = time;
        this.sendSchedule();
      });
  }

  openClosedHourPicker() {
    const amazingTimePicker = this.atp.open(
      this.getConfigTimePicker(this.closedHour)
    );
    amazingTimePicker.afterClose()
      .subscribe(time => {
        this.closedHour = time;
        this.sendSchedule();
      });
  }

  sendSchedule() {
    this.addSchedule.emit({
      from_hour_free_order: this.openingHour,
      to_hour_free_order: this.closedHour,
    });
  }

  getConfigTimePicker(time: string): object {
    return {
      time,
      theme: 'light',
      preference: {
        labels: {
          ok: 'Aceptar',
          cancel: 'Cancelar'
        }
      },
      arrowStyle: {
        background: 'orange',
        color: 'white'
      }
    };
  }



}
