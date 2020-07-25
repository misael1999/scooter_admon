import { Component, OnInit } from '@angular/core';
import { ScheduleModel } from 'src/app/models/schedule.model';
import { ProfileService } from 'src/app/services/profile.service';
import { ConfigAccountService } from 'src/app/services/config-account.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tab-schedule',
  templateUrl: './tab-schedule.component.html',
  styleUrls: ['./tab-schedule.component.scss']
})
export class TabScheduleComponent implements OnInit {

  scheduleSelected = [];
  schedules: Array<any>;
  schedulesStation = [];
  station: any;
  loadingSchedules = false;
  loadingSaveInfo = false;
  isChangeSchedule = false;


  constructor(private profileService: ProfileService,
     private configService: ConfigAccountService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getSchedules();
    this.station = this.profileService.station;
    this.schedulesStation = this.station.schedules;
  }

  getSchedules() {
    this.configService.getSchedules()
      .subscribe((data: any) => {
        const schedulesTemp: Array<any> = data.data;

        this.schedulesStation.forEach(schedule => {

          const scheduleFindIndex = schedulesTemp.findIndex(scheduleTemp => scheduleTemp.id == schedule.schedule_id);
          if (scheduleFindIndex >= 0) {
            const name = schedulesTemp[scheduleFindIndex].name;
            // const id = schedulesTemp[scheduleFindIndex].id;
            schedulesTemp[scheduleFindIndex] = schedule;
            schedulesTemp[scheduleFindIndex].checked = true;
            schedulesTemp[scheduleFindIndex].name = name;
            this.scheduleSelected.push(schedule);
          }

        });

        this.schedules = schedulesTemp;
      });
  }

  addSchedule(schedule) {
    this.isChangeSchedule = true;
    if (schedule.checked) {
      const index = this.scheduleSelected.findIndex((schedu) =>
        schedu.schedule_id === schedule.schedule_id);

      // If exist schedule, then update it
      delete schedule.checked;
      if (index >= 0) {
        this.scheduleSelected[index] = { ...schedule };
        return;
      }
      // If not exist schedule, then add in array
      this.scheduleSelected.push({
        ...schedule
      });
    } else {
      this.deleteSchedule(schedule.schedule_id);
    }
  }

  deleteSchedule(scheduleId) {
    const index = this.scheduleSelected.findIndex((schedule) => {
      return schedule.schedule_id === scheduleId});
    if (index >= 0) {
      this.scheduleSelected.splice(index, 1);
    }
    this.isChangeSchedule = true;
  }

  saveScheduleInfo() {

    this.loadingSaveInfo = true;
    this.profileService.updateStation({schedules: this.scheduleSelected})
    .subscribe((data: any) => {
      this.showMessageSuccess('Horarios actualizados correctamente');
      this.loadingSaveInfo = false;
      localStorage.setItem('station', JSON.stringify(data.data));
      this.isChangeSchedule = false;
      // location.reload();
      // this.changeImage = false;
    }, error => {
        this.showMessageError(error.errors.message);
        this.loadingSaveInfo = false;
      });

  }

  showMessageSuccess(message) {
    this.snackBar.open(message, 'Aceptar', {
      duration: 3000,
      panelClass: ['main-snackbar']
    });
  }

  showMessageError(message) {
    this.snackBar.open(message, 'Aceptar', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }

}
