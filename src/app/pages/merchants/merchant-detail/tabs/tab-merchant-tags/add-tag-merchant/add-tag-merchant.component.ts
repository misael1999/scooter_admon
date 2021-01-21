import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TagByMerchantsService } from 'src/app/services/tag-by-merchants.service';
import { TagsGeneralService } from '../../../../../../services/tags-general.service';
import { ValidationForms } from '../../../../../../utils/validations-forms';

export interface Tags {
  tags: [],
  delete_tags: []
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
  idMerchant;
  tagsGeneral: Array<any> = [];
  tagsTheMerchant: Array<any> = [];
  tagsNew = [];
  tagNnew2 = [];
  tagNueva: Tags;



  constructor(private tagsGeneralService: TagsGeneralService, private tagByMerchantService: TagByMerchantsService, private fb: FormBuilder, private dialogRef: MatDialogRef<AddTagMerchantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super();

    this.tagsTheMerchant = data.tags.tags;
    this.idMerchant = data.tags.id;
    console.log(this.idMerchant);
    console.log(this.tagsTheMerchant);
  }

  ngOnInit(): void {
    this.getTagGeneral();
  }

  addTag(data) {
    this.tagsNew.push(data)
    console.log(this.tagsNew);
    return this;
  }

  deleteTag(data) {
    this.tagsNew = this.tagsNew.filter(s => s !== data);
    console.log(this.tagsNew);
    return this.tagsNew;
  }


  guardar() {
    console.log(this.tagsNew);
    this.loadingSave = true;
    // this.tagNueva.tags = this.tagsNew.forEach((this.tagNueva: any) =>{

    // });


    // this.merchantsTemp.forEach((merchant: any) => {
    //   if (category.name == merchant.category) {
    //     category.count++;
    //   }
    // });


      console.log(this.tagNueva);

    this.tagByMerchantService.createTags(this.idMerchant, this.tagNueva)
      .subscribe((data) => {
        this.loadingSave = false;
        this.showSwalMessage('Etiquetas Agregadas Correctamente')
        this.dialogRef.close(true);
      }, error => {
        this.showSwalMessage('Error al agregar');
        this.loadingSave = false;
      });
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
