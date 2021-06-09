import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list-promotions',
  templateUrl: './list-promotions.component.html',
  styleUrls: ['./list-promotions.component.scss']
})
export class ListPromotionsComponent implements OnInit {
  @Input() promotions;
  @Input() params;
  @Output() reloadPromotions = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

}
