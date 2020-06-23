import { Component, OnInit, AfterContentInit } from '@angular/core';
import { FirebaseMessagingService } from '../services/firebase-messaging.service';
declare function init_sb_adminjs();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit, AfterContentInit {

  constructor(private firebaeMessagingService: FirebaseMessagingService) {
  }

  ngOnInit(): void {
    init_sb_adminjs();
    this.firebaeMessagingService.requestPermission();
    this.firebaeMessagingService.receiveMessage();
  }

  ngAfterContentInit() {
  }

}
