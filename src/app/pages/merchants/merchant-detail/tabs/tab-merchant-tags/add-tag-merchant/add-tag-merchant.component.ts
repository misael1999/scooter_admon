import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TagByMerchantsService } from 'src/app/services/tag-by-merchants.service';
import { TagsGeneralService } from '../../../../../../services/tags-general.service';
import { ValidationForms } from '../../../../../../utils/validations-forms';

@Component({
  selector: 'app-add-tag-merchant',
  templateUrl: './add-tag-merchant.component.html',
  styleUrls: ['./add-tag-merchant.component.scss']
})
export class AddTagMerchantComponent extends ValidationForms implements OnInit {
  loadingTagGeneral: boolean;
  params = { limit: 50, offset: 0, search: '', ordering: '' };
  idMerchant;
  tagsGeneral: Array<any> = [];
  tagsOwnMerchant: Array<any> = [];
  tagsTheMerchant: Array<any> = [];



  constructor(private tagsGeneralService: TagsGeneralService, private tagByMerchantService: TagByMerchantsService, private fb: FormBuilder, private dialogRef: MatDialogRef<AddTagMerchantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super();

    this.tagsOwnMerchant = data.tags.tags;
    console.log(this.tagsOwnMerchant);
    // this.idMerchant = data.tags.id;
    // console.log(this.idMerchant);
    // this.tagsTheMerchant = this.tagsOwnMerchant.forEach(function (value:any, index,a))
    // console.log(this.tagsTheMerchant);

  }

  ngOnInit(): void {
    this.getTagGeneral();
  }

  agregar(data) {
    this.tagsTheMerchant.push(data);
    console.log(this.tagsTheMerchant);
    return this.tagsTheMerchant;
  }

  quitar(data) {
    this.tagsTheMerchant = this.tagsTheMerchant.filter(s => s !== data);
    console.log(this.tagsTheMerchant);
    return this.tagsTheMerchant;
  }


  guardar() {
    this.tagByMerchantService.createTag(this.idMerchant, this.tagsTheMerchant)
      .subscribe((data) => {
        this.showSwalMessage('Agregado Correctamente')
        this.dialogRef.close(true);
      }), error => {
        this.showSwalMessage(error.error.errors.errors.message);
      }
  }



  getTagGeneral() {
    this.loadingTagGeneral = true;
    this.tagsGeneralService.getTags(this.params)
      .subscribe((data: any) => {
        this.tagsGeneral = data.results;
        this.loadingTagGeneral = false;
        // console.log('FFFF', this.tagsGeneral);
      }), error => {
        this.loadingTagGeneral = false;
        console.log('eroroe');
      }
  }

  searchBy(value) {
    this.params.search = value;
    this.getTagGeneral();
  }
}
