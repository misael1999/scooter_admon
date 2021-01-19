import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab-merchant-general',
  templateUrl: './tab-merchant-general.component.html',
  styleUrls: ['./tab-merchant-general.component.scss']
})
export class TabMerchantGeneralComponent implements OnInit {

  @Input() merchant;

  constructor() {
  }

  ngOnInit(): void {
  }

}

