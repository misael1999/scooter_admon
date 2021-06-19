import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ValidationForms } from 'src/app/utils/validations-forms';
import { TagsGeneralService } from '../../../../services/tags-general.service';

@Component({
  selector: 'app-list-tags',
  templateUrl: './list-tags.component.html',
  styleUrls: ['./list-tags.component.scss']
})
export class ListTagsComponent extends ValidationForms implements OnInit {
  @Input() tags;
  @Input() params;
  @Output() reloadTags = new EventEmitter<boolean>();

  constructor(
    private tagsGeneralService: TagsGeneralService) {
    super();
  }

  ngOnInit(): void { }


  async disableTag(tagId) {
    const confirmation = await this.showMessageConfirm('De bloquear la etiqueta');
    if (!confirmation.value) { return; }
    this.tagsGeneralService.deleteTag(tagId)
      .subscribe((data: any) => {
        this.showSwalMessage('Etiqueta bloqueada correctamente');
        this.reloadTags.emit(true);

      }, error => {
        this.showSwalMessage(error.errors.message, 'error');
      });
  }

  async eneableTag(tagId) {
    const confirmation = await this.showMessageConfirm('De bloquear la etiqueta');
    if (!confirmation.value) { return; }
    this.tagsGeneralService.deleteTag(tagId)
      .subscribe((data: any) => {
        this.showSwalMessage('Etiqueta bloqueada correctamente');
        this.reloadTags.emit(true);

      }, error => {
        this.showSwalMessage(error.errors.message, 'error');
      });
  }
}
