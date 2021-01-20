import { Component, OnInit, Input } from '@angular/core';
import { TagByMerchantsService } from 'src/app/services/tag-by-merchants.service';
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
  tagsMerchant: any;

  constructor(private merchantsService: MerchantsService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.tagsMerchant = this.merchantsService.merchantId.tags;
    console.log('esta es la info', this.tagsMerchant);
  }


  openDialogAddTag(tags) {
    const dialogRef = this.dialog.open(AddTagMerchantComponent, {
      minWidth: '40%',
      maxWidth: '40%',
      minHeight: '500px',
      maxHeight: '500px',
      data: { tags }
    });
    dialogRef.afterClosed()
      .subscribe((data: any) => {
        if (data) {
          this.tagsMerchant;
        }
      });
  }
}
