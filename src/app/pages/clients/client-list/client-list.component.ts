import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  @Input() clients;

  constructor() { }

  ngOnInit(): void { }
}
