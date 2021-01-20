import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { TagsGeneralService } from '../../../services/tags-general.service';
import { AddTagComponent } from './add-tag/add-tag.component';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  tags: any;
  loadignTag: boolean;
  params = { limit: 25, offset: 0, search: '', ordering: '' };

  constructor(private tagsGeneralService: TagsGeneralService, private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getTags();
  }

  openDialogAddTag(tag = null) {
    const dialogRef = this.dialog.open(AddTagComponent, {
      minWidth: '60%',
      minHeight: '400px',
      data: { tag }
    });
    dialogRef.afterClosed()
      .subscribe((data: any) => {
        if (data) {
          this.getTags();
        }
      });
  }

  getTags() {
    this.loadignTag = true,
      this.tagsGeneralService.getTags(this.params)
        .subscribe((data: any) => {
          this.loadignTag = false;
          this.tags = data.results;
          console.log(this.tags);
        }), error => {
          this.loadignTag = false;
          console.log('eror al obtener Tag');
        }
  }


  searchBy(value) {
    this.params.search = value;
    this.getTags();
  }

  orderingBy(value: string) {
    this.params.ordering = value;
    this.getTags();
  }

  deleteTag(tag) {
    Swal.fire({
      title: 'Bloquear',
      text: `Esta seguro de bloquear a ${tag.name}`,
      type: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Bloquear',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then(resp => {
      if (resp.value) {
        this.tagsGeneralService.deleteTag(tag.id)
          .subscribe(data => {
            Swal.fire({
              title: 'Bloqueado',
              type: 'success',
              text: 'La Etiqueta ha sido bloqueado',
              timer: 2000
            });
          });
      }
    });
  }

}

