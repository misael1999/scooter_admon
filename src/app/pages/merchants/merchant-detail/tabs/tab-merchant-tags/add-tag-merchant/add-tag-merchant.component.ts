import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-tag-merchant',
  templateUrl: './add-tag-merchant.component.html',
  styleUrls: ['./add-tag-merchant.component.scss']
})
export class AddTagMerchantComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  // getTagGeneral() {
  //   this.loadingTagGeneral = true;
  //   this.tagsGeneralService.getTags(this.params)
  //     .subscribe((data: any) => {
  //       this.tagsGeneral = data;
  //       console.log('FFFF', this.tagsGeneral);

  //     }), error => {
  //       console.log(error);
  //     }

  // }
}
