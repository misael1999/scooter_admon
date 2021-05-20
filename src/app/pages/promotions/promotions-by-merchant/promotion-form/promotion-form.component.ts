import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promotion-form',
  templateUrl: './promotion-form.component.html',
  styleUrls: ['./promotion-form.component.scss']
})
export class PromotionFormComponent implements OnInit {

  typeDiscount;
  checked;

  constructor() { }

  ngOnInit(): void {
  }


  selectOption({value}) {
    this.typeDiscount = value;
  }

}
