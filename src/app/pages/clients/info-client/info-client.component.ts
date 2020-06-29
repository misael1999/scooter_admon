import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientsService } from '../../../services/clients.service';

@Component({
  selector: 'app-info-client',
  templateUrl: './info-client.component.html',
  styleUrls: ['./info-client.component.scss']
})
export class InfoClientComponent implements OnInit {

  idCustomer: number;
  infoCustomer: Array<any> = [];



  constructor(private clientService: ClientsService, private activatedRouted: ActivatedRoute) {
    this.idCustomer = this.activatedRouted.snapshot.params.id;
    console.log(this.idCustomer);
  }

  ngOnInit(): void {
    this.getCustomerId();
  }


  getCustomerId() {
    this.clientService.getClientId(this.idCustomer)
      .subscribe((data: any) => {
        this.infoCustomer = data.customer;
        console.log(this.infoCustomer);
      }, error => {

      });
  }

}
