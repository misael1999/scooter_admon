import { Component, OnInit, Input } from '@angular/core';
import { TagsGeneralService } from '../../../../../services/tags-general.service';
import { MerchantsService } from '../../../../../services/merchants.service';
import { MatDialog } from '@angular/material/dialog';
import { AddTagMerchantComponent } from './add-tag-merchant/add-tag-merchant.component';

@Component({
  selector: 'app-tab-merchant-tags',
  templateUrl: './tab-merchant-tags.component.html',
  styleUrls: ['./tab-merchant-tags.component.scss']
})
export class TabMerchantTagsComponent implements OnInit {
  merchantTags;
  loadingData;

  constructor(private merchantsService: MerchantsService,
              private tagsGeneralService: TagsGeneralService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getTagsMerchant();
  }

  getTagsMerchant() {
    this.loadingData = true;
    this.merchantsService.getTags(this.merchantsService.merchantId)
      .subscribe((data: any) => {
        console.log('Esta es la data', data.results);
        this.merchantTags = data.results;
        this.loadingData = false;
      }), error => {
        this.loadingData = false;
        console.log('eroroe');
      };
  }

  openDialogAddTag(tags) {
    const dialogRef = this.dialog.open(AddTagMerchantComponent, {
      minWidth: '40%',
      maxWidth: '40%',
      minHeight: '500px',
      maxHeight: '500px',
      data: { tags, merchantId: this.merchantsService.merchantId }
    });
    dialogRef.afterClosed()
      .subscribe((data: any) => {
        if (data) {
          this.getTagsMerchant();
        }
      });
  }
}
