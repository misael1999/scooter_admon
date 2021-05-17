import { Component, OnInit } from '@angular/core';
import { StationModel } from 'src/app/models/station.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  station: StationModel;

  constructor(private authService: AuthService) {
    this.station = JSON.parse(localStorage.getItem('station'));
    console.log(this.station);



  }

  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {
  }

}
