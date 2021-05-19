import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-main-clients',
  templateUrl: './main-clients.component.html',
  styleUrls: ['./main-clients.component.scss']
})
export class MainClientsComponent implements OnInit {
  // MATPAGINATOR INPUTS
  length = 0;
  pageSize = 25;
  pageIndex = 0;
  pageEvent: PageEvent;
  pageSizeOptions: number[] = [25, 50, 75, 100];
  // PARAMETROS
  params = { limit: 25, offset: 0, page: 1, search: '', ordering: '' };
  loadingData: boolean;
  clients: Array<any> = [];
  searchText;

  constructor(private clientsService: ClientsService) { }

  ngOnInit(): void {
    this.getClients();
  }


  getClients() {
    this.loadingData = true;
    this.clientsService.getClients(this.params)
      .subscribe((data: any) => {
        this.loadingData = false;
        this.clients = data.results;
        this.length = data.count;
        this.clientsService.params = this.params;
        this.pageIndex = (this.params.offset / this.params.limit);
      }, error => {
        this.loadingData = false;
      });
  }


  searchBy(value: string) {
    this.params.search = value;
    this.clientsService.searchText = value;
    this.getClients();
  }


  clearSearch() {
    this.params.search = '';
    this.clientsService.searchText = '';
    this.searchText = "";
    this.getClients();
  }

  orderBy(value: string) {
    this.params.ordering = value;
    this.getClients();
  }

  getPages(e): PageEvent {
    if (this.clients.length === 0) {
      this.pageSize = 25;
      this.pageIndex = 0;
      return;
    }
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.params.limit = e.pageSize;
    this.params.offset = this.params.limit * e.pageIndex;
    this.getClients();
  }
}
