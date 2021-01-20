import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TagsGeneralService } from '../../../../../../services/tags-general.service';

@Component({
  selector: 'app-add-tag-merchant',
  templateUrl: './add-tag-merchant.component.html',
  styleUrls: ['./add-tag-merchant.component.scss']
})
export class AddTagMerchantComponent implements OnInit {
  loadingTagGeneral: boolean;
  tagsGeneral: Array<any> = [];
  tagsTheMerchants;
  params = { limit: 50, offset: 0, search: '', ordering: '' };


  constructor(private tagsGeneralService: TagsGeneralService, private fb: FormBuilder, private dialogRef: MatDialogRef<AddTagMerchantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.tagsTheMerchants = data.tags;
    console.log(this.tagsTheMerchants);

  }

  ngOnInit(): void {
    this.getTagGeneral();
  }


  getTagGeneral() {
    this.loadingTagGeneral = true;
    this.tagsGeneralService.getTags(this.params)
      .subscribe((data: any) => {
        this.tagsGeneral = data.results;
        this.loadingTagGeneral = false;
        console.log('FFFF', this.tagsGeneral);
      }), error => {
        this.loadingTagGeneral = false;
        console.log('eroroe');
      }
  }



  searchBy(value) {
    this.params.search = value;
    this.getTagGeneral();
  }


  saveTags() {

  }

}
