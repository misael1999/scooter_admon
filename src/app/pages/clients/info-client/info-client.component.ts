import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ClientsService } from '../../../services/clients.service';

@Component({
  selector: 'app-info-client',
  templateUrl: './info-client.component.html',
  styleUrls: ['./info-client.component.scss']
})
export class InfoClientComponent implements OnInit {
  idCustomer: number;
  infoCustomer;
  from_date;
  to_date;
  params: {};


  constructor(private clientService: ClientsService, private activatedRouted: ActivatedRoute, private router: Router) {
    this.idCustomer = this.activatedRouted.snapshot.params.id;
  }

  ngOnInit(): void {
    this.getCustomerId();
  }

  selectFromDate(fromDate) {
    const momentDate = new Date(fromDate);
    console.log(momentDate);

    console.log(fromDate);

    this.from_date = moment(fromDate).format('YYYY-MM-DD');
    if (this.from_date && this.to_date ) {
      this.getCustomerId({from_date: this.from_date, to_date: this.to_date });

    }
    // console.log(from_date);
  }

  selectTodate(toDate) {
    const momentDate = new Date(toDate);
    this.to_date = moment(toDate).format('YYYY-MM-DD');
    if (this.from_date && this.to_date ) {
      this.getCustomerId({from_date: this.from_date, to_date: this.to_date });

    }
    // console.log(to_date);
  }


  getCustomerId(params = {} ) {
    console.log(params);
    this.clientService.getClientId(this.idCustomer, params)
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
