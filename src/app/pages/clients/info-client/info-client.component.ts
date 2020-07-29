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
  infoCustomer;
  params = {}


  constructor(private clientService: ClientsService, private activatedRouted: ActivatedRoute, private router: Router) {
    this.idCustomer = this.activatedRouted.snapshot.params.id;
    // console.log( 'El id obtenido es', this.idCustomer);
  }

  ngOnInit(): void {
    this.getCustomerId();
  }

  selectFromDate(fromDate) {

    console.log(fromDate);
  }


  getCustomerId() {
    this.clientService.getClientId(this.idCustomer, this.params)
      .subscribe((data: any) => {
        this.infoCustomer = data;
        console.log(this.infoCustomer);
      }, error => {
        if (error.errors.code === 'not_found') {
          this.router.navigate(['not_found']);
          return;
        }
        console.log(error.errors.code);
      });
  }

}
