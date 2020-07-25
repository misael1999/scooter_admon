import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  // station: Array<any> = [];
  station;
  constructor(private profileService: ProfileService) { }

  ngOnInit(): void {
    this.getStation();
  }

  getStation() {
    this.profileService.getStation()
      .subscribe((data: any) => {
        this.station = data;
        console.log('La informacion', this.station);
        this.profileService.station = this.station;
      }, error => {
        console.log(error);
        // return;
      });
  }

}
