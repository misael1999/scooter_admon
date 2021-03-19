import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../../services/clients.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {
  // MATPAGINATOR INPUTS
  length = 0;
  pageSize = 25;
  pageIndex = 0;
  pageSizeOptions: number[] = [25, 50, 75, 100];


  // MATPAGINATOR  OUTPUT 
  pageEvent: PageEvent;


  // PARAMETROS
  params = { limit: 25, offset: 1, page: 1, search: '', ordering: '' };
  loadingdata: boolean;
  clients: Array<any> = [];
  searchText;


  constructor(private clientsService: ClientsService) { }

  ngOnInit(): void {
    this.getClients();
  }


  getClients() {
    this.loadingdata = true;
    this.clientsService.getClients(this.params)
      .subscribe((data: any) => {
        this.loadingdata = false;
        this.clients = data.results;
        this.length = data.count;
        this.pageIndex = this.params.page - 1;
        this.pageSize = this.params.limit;
      }, error => {
        this.loadingdata = false;
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


  ordenamiento(value: string) {
    this.params.ordering = value;
    this.getClients();
  }


  // METHOD PAGINATOR
  getPages(e): PageEvent {
    if (this.clients.length === 0) {
      this.pageSize = 25;
      this.pageIndex = 0;
      return;
    }
    this.pageIndex = e.pageIndex;
    this.params.limit = e.pageSize;
    this.params.page = e.pageIndex + 1;
    this.params.offset = this.params.limit * e.pageIndex + 1;

    this.getClients();
  }
}
