import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../../services/clients.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit {
  7
  loadingData: boolean;
  idClient: number;
  dataClient;
  address;

  constructor(
    private clientsService: ClientsService,
    private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe((params) => {
      this.idClient = params.id;
    });
  }

  ngOnInit(): void {
    this.getClient();
  }

  getClient() {
    this.loadingData = true;
    this.clientsService.getClientById(this.idClient)
      .subscribe((data: any) => {
        this.loadingData = false;
        this.dataClient = data;
        console.log(this.dataClient);
        this.getAddress();

      }, error => {
        this.loadingData = false;
      });
  }
  getAddress() {
    this.loadingData = true;
    this.clientsService.getAddressesByClient(this.idClient)
      .subscribe((data: any) => {
        this.loadingData = false;
        this.address = data.results;
        console.log(this.address);

      }, error => {
        this.loadingData = false;
      });
  }
}
