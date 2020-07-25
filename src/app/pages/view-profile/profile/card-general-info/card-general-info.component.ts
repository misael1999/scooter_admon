import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-general-info',
  templateUrl: './card-general-info.component.html',
  styleUrls: ['./card-general-info.component.scss']
})
export class CardGeneralInfoComponent implements OnInit {

  @Input() station;

  constructor() { }

  ngOnInit(): void {
  }

}
