import { Component, OnInit, AfterContentInit } from '@angular/core';
declare function init_js_template();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit, AfterContentInit {

  constructor() {
  }

  ngOnInit(): void {
    init_js_template();
/*     this.firebaeMessagingService.requestPermission();
    this.firebaeMessagingService.receiveMessage(); */
  }

  ngAfterContentInit() {
  }

}
