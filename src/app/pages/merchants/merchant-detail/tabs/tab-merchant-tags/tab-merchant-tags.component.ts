import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tab-merchant-tags',
  templateUrl: './tab-merchant-tags.component.html',
  styleUrls: ['./tab-merchant-tags.component.scss']
})
export class TabMerchantTagsComponent implements OnInit {

  @Input() merchantTag;

  constructor() { }

  ngOnInit(): void {
  }

}
