import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TagByMerchantsService } from 'src/app/services/tag-by-merchants.service';
import { TagsGeneralService } from '../../../../../../services/tags-general.service';
import { ValidationForms } from '../../../../../../utils/validations-forms';

export interface Tags {
  tags: [];
  delete_tags: [];
}



@Component({
  selector: 'app-add-tag-merchant',
  templateUrl: './add-tag-merchant.component.html',
  styleUrls: ['./add-tag-merchant.component.scss']
})
export class AddTagMerchantComponent extends ValidationForms implements OnInit {
  loadingTagGeneral: boolean;
  loadingSave: boolean;
  params = { limit: 50, offset: 0, search: '', ordering: '' };
  merchantId;
  tagsGeneral: Array<any> = [];
  tagsTheMerchant: Array<any> = [];
  tagsAdd = [];
  tagsDelete = [];


  constructor(private tagsGeneralService: TagsGeneralService, private tagByMerchantService: TagByMerchantsService, private fb: FormBuilder, private dialogRef: MatDialogRef<AddTagMerchantComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    super();

    this.tagsTheMerchant = data.tags;
    this.merchantId = data.merchantId;
  }

  ngOnInit(): void {
    this.getTagGeneral();
  }

  addTag(data) {
    data.is_select ? null : this.tagsAdd.push(data.id);
  }

  deleteTag(data) {
    if (data.is_select) {
      this.tagsDelete.push(data.id);
    } else {
      const index = this.tagsAdd.indexOf(data.id);
      this.tagsAdd.splice(index, 1);

    }
  }

  guardar() {
    const tags = {
      tags: this.tagsAdd,
      delete_tags: this.tagsDelete
    };


    this.loadingSave = true;

    this.tagByMerchantService.createTags(this.merchantId, tags)
      .subscribe((data) => {
        this.loadingSave = false;
        this.showSwalMessage('Etiquetas Agregadas Correctamente');
        this.dialogRef.close(true);
      }, error => {
        this.showSwalMessage('Error al agregar', 'error');
        this.loadingSave = false;
      });
  }

  getTagGeneral() {
    this.loadingTagGeneral = true;
    this.tagsGeneralService.getTags(this.params)
      .subscribe((data: any) => {
        this.tagsGeneral = data.results;
        this.loadingTagGeneral = false;
        this.parseTags();
      }), error => {
        this.loadingTagGeneral = false;
      };
  }

  parseTags() {
    this.tagsGeneral.forEach((tag) => {
      this.tagsTheMerchant.forEach((tagM) => {
        if (tag.id == tagM.tag_id) {
          tag.is_select = true;
        }
      });
    });
  }

  searchBy(value) {
    this.params.search = value;
    this.getTagGeneral();
  }
}
