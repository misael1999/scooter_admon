import { Component, OnInit, AfterContentInit } from '@angular/core';
declare function init_sb_adminjs();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit, AfterContentInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    init_sb_adminjs();
  }

}
