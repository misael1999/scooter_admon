import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ClientsService } from 'src/app/services/clients.service';
import * as moment from 'moment';

@Component({
  selector: 'app-info-client',
  templateUrl: './info-client.component.html',
  styleUrls: ['./info-client.component.scss']
})
export class InfoClientComponent implements OnInit {
  loadingData: boolean;
  idCustomer: number;
  dataCustomer;
  from_date;
  to_date;
  params: { from_date: '2020-01-01', to_date: '2021-08-20' };


  constructor(private clientService: ClientsService, private activatedRouted: ActivatedRoute, private router: Router) {
    this.idCustomer = this.activatedRouted.snapshot.params.id;
    console.log('ID', this.idCustomer);
  }

  ngOnInit(): void {
    this.getCustomerId(this.params)
  }

  selectFromDate(fromDate) {
    const momentDate = new Date(fromDate);
    console.log(momentDate);

    console.log(fromDate);

    this.from_date = moment(fromDate).format('2020-01-01');
    if (this.from_date && this.to_date) {
      this.getCustomerId({ from_date: this.from_date, to_date: this.to_date });

    }
    // console.log(from_date);
  }

  selectTodate(toDate) {
    const momentDate = new Date(toDate);
    this.to_date = moment(toDate).format('2021-08-20');
    if (this.from_date && this.to_date) {
      this.getCustomerId({ from_date: this.from_date, to_date: this.to_date });

    }
    // console.log(to_date);
  }


  getCustomerId(params = {}) {
    console.log('Date ', params);
    this.loadingData = true;
    this.clientService.getCustomerByDate(this.idCustomer, params)
      .subscribe((data: any) => {
        this.loadingData = false;
        this.dataCustomer = data;
        console.log(this.dataCustomer);
      }, error => {
        console.log(error);
        this.loadingData = false;
      });
  }
}
