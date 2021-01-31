import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../../services/clients.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  // MatPaginator Inputs
  length = 100;
  pageSize = 25;
  pageSizeOptions: number[] = [25, 50, 75, 100];

  // MatPaginator Output
  pageEvent: PageEvent;

  // Parametros para el paginado
  params = { limit: 25, offset: 0, search: '', ordering: '' };
  loadingClient: boolean;
  clients: Array<any> = [];
  searchText;

  constructor(private clientsService: ClientsService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.searchText = this.clientsService.searchText;
    this.getClients();
  }

  getClients() {
    this.loadingClient = true;
    this.clientsService.getClients(this.params)
      .subscribe((data: any) => {
        this.clients = data.results;
        // console.log(this.clients);
        this.length = data.count;
        this.loadingClient = false;
      }, error => {
        this.loadingClient = false;
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

  // Metodo paginator
  getPages(e): PageEvent {
    if (this.clients.length === 0) {
      this.pageSize = 25;
      return;
    }
    this.params.limit = e.pageSize;
    this.params.offset = this.params.limit * e.pageIndex;
    this.getClients();
  }
}
