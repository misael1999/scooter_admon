import { Component, OnInit } from '@angular/core';
import { Merchant } from 'src/app/models/merchant.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  merchant: Merchant;

  constructor() {
    this.merchant = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit(): void {
  }

}
