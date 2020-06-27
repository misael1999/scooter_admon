import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { VehiclesService } from '../../../services/vehicles.service';

@Component({
  selector: 'app-add-vehicles',
  templateUrl: './add-vehicles.component.html',
  styleUrls: ['./add-vehicles.component.scss']
})
export class AddVehiclesComponent implements OnInit {
  vehicle: any;

  constructor(private vehicleService: VehiclesService) { }

  ngOnInit(): void {
  }

  addVehicle(form: NgForm) {
    this.vehicleService.createVehicle(this.vehicle);


  }
}


