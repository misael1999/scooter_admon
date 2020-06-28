import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../../services/clients.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  clients: Array<any> = [];

  constructor(private clientService: ClientsService) { }

  ngOnInit(): void {
    this.gettClients();


  }


  gettClients() {
    this.clientService.getClients()
    .subscribe( (data: any) => {
      this.clients = data;
      console.log('Los clientes registrados son ', this.clients);
    }, error => {
      console.log('Error');
    });
  }


}
