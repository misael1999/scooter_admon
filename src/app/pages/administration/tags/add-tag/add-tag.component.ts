import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ValidationForms } from 'src/app/utils/validations-forms';
import { TagsGeneralService } from '../../../../services/tags-general.service';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.scss']
})
export class AddTagComponent extends ValidationForms implements OnInit {
  tagForm: FormGroup;
  tag: any;
  loadingSave: boolean;
  imageURL: string;


  constructor(private fb: FormBuilder, private tagsGeneralService: TagsGeneralService, private dialogRef: MatDialogRef<AddTagComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    super();

    if (data.tag) {
      this.tag = data.tag;
      this.buildUpdateForm(this.tag);
    } else {
      this.buildForm();
    }
  }

  ngOnInit(): void {
  }

  createTag() {
    if (this.tagForm.invalid) {
      this.tagForm.markAllAsTouched();
      return;
    }
    const tag = this.tagForm.value;
    this.loadingSave = true;
    if (this.tag) {
      this.updateTag(this.tag.id, tag);
    } else {
      this.addTag(tag);
    }
  }
  


  addTag(tag) {
    if (this.imageURL) {
      tag.picture = this.imageURL;
    }
    this.tagsGeneralService.createTag(tag)
      .subscribe((data) => {
        this.showSwalMessage('Etiqueta Agregada Correctamente');
        this.loadingSave = false;
        this.dialogRef.close(true);
      }, error => {
        this.showSwalMessage(error.errors.message);
        this.loadingSave = false;
      });
  }


  
  buildForm() {
    this.tagForm = this.fb.group(
      {
        name: [null, Validators.required],
        area: [1],
        picture: [null],
      }
    );
  }




  updateTag(tagId, tag) {
    this.tagsGeneralService.editTag(tagId, tag)
      .subscribe((data) => {
        this.showSwalMessage('Etiqueta Actualizada Correctamente');
        this.loadingSave = false;
        this.dialogRef.close(true);
      }, error => {
        this.showSwalMessage('error en actualizar serve');
        this.loadingSave = false;
      })
  }
  buildUpdateForm(tag) {
    this.tagForm = this.fb.group(
      {
        name: [tag.name, Validators.required],
        picture: [tag.picture],
      }
    );
  }



  handlePickUpImage(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageURL = String(reader.result);
    }
  }

}
