import { Component, OnInit } from '@angular/core';
import { VehiclesService } from '../../../services/vehicles.service';
import { DeliveryMenService } from '../../../services/delivery-men.service';
import { ClientsService } from '../../../services/clients.service';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {

  params;
  totalVehicles;
  totalDelivery;
  totalClient;

  constructor(private vehicleService: VehiclesService,
    private deliveryserice: DeliveryMenService,
    private clientService: ClientsService) { }

  ngOnInit(): void {
/*     this.getCountVehicles();
    this.getCountDelivery();
    this.getCountClient(); */
  }

  getCountVehicles() {
    this.vehicleService.getVehicles(this.params)
      .subscribe((data: any) => {
        this.totalVehicles = data.count;
      });
  }

  getCountDelivery() {
    this.deliveryserice.getDeliverys(this.params)
      .subscribe((data: any) => {
        this.totalDelivery = data.count;
      });
  }

  getCountClient() {
    this.clientService.getClients(this.params)
      .subscribe((data: any) => {
        this.totalClient = data.count;
      });
  }

}
