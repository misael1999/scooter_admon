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
  loadingTags: boolean;



  // @Input() merchantTag;
  // tags: any;
  // tagsGeneral: any;
  // loadingTags: boolean;
  // loadingTagGeneral;
  // params = { limit: 25, offset: 0, search: '', ordering: 'created' };
  // length = 100;
  // pageSize = 25;
  // pageSizeOptions: number[] = [25, 50, 75, 100];


  constructor(private merchantsService: MerchantsService, private dialog: MatDialog, private tagByMerchantsService: TagByMerchantsService, private tagsGeneralService: TagsGeneralService) { }

  ngOnInit(): void {
    this.tagsMerchant = this.merchantsService.merchantId;
    console.log('esta es la info', this.tagsMerchant.tags);
  }



  openDialogAddTag(tag = null) {
    const dialogRef = this.dialog.open(AddTagMerchantComponent, {
      minWidth: '60%',
      minHeight: '400px',
      data: { tag }
    });
    dialogRef.afterClosed()
      .subscribe((data: any) => {
        if (data) {
          this.tagsMerchant;
        }
      });
  }







}
