import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { TagsGeneralService } from 'src/app/services/tags-general.service';
import { AddTagComponent } from '../add-tag/add-tag.component';

@Component({
  selector: 'app-main-tags',
  templateUrl: './main-tags.component.html',
  styleUrls: ['./main-tags.component.scss']
})
export class MainTagsComponent implements OnInit {
  length = 0;
  pageSize = 25;
  pageIndex = 0;
  pageEvent: PageEvent;
  pageSizeOptions: number[] = [25, 50, 75, 100];
  tags: any;
  loadingData: boolean;
  params = { limit: 25, offset: 0, search: '', ordering: '', category: '' };
  searchText;

  constructor(
    private tagsGeneralService: TagsGeneralService,
    private dialog: MatDialog) { }

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
    this.loadingData = true,
      this.tagsGeneralService.getTags(this.params)
        .subscribe((data: any) => {
          this.loadingData = false;
          this.tags = data.results;
          this.length = data.count;
          this.tagsGeneralService.params = this.params;
          this.pageIndex = (this.params.offset / this.params.limit);
        }), error => {
          this.loadingData = false;
        };
  }

  searchBy(value: string) {
    this.params.search = value;
    this.tagsGeneralService.searchText = value;
    this.getTags();
  }

  clearSearch() {
    this.params.search = '';
    this.tagsGeneralService.searchText = '';
    this.searchText = '';
    this.getTags();
  }

  orderBy(value: string) {
    this.params.ordering = value;
    this.getTags();
  }

  showBy(value) {
    this.params.category = value;
    this.getTags();
  }

  getPages(e): PageEvent {
    if (this.tags.length === 0) {
      this.pageSize = 25;
      this.pageIndex = 0;
      return;
    }
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.params.limit = e.pageSize;
    this.params.offset = this.params.limit * e.pageIndex;
    this.getTags();
  }
}
