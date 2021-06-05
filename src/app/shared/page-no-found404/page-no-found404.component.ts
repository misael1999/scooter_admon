import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-no-found404',
  templateUrl: './page-no-found404.component.html',
  styleUrls: ['./page-no-found404.component.scss']
})
export class PageNoFound404Component implements OnInit {
  year = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
  }

}
