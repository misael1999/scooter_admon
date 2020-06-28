import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info-client',
  templateUrl: './info-client.component.html',
  styleUrls: ['./info-client.component.scss']
})
export class InfoClientComponent implements OnInit {

  idCustomer: number;



  constructor(private activatedRouted: ActivatedRoute) {
    this.idCustomer =  this.activatedRouted.snapshot.params.id;
    console.log(this.idCustomer);
   }

  ngOnInit(): void {
  }

}
