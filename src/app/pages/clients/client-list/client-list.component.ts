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
  params = { limit: 15, offset: 0, search: '', order_status: 8, ordering: '' };
  // vehicles: [];
  animal: string;
  name: string;
  loadingClient: boolean;


  clients: Array<any> = [];

  constructor(private clientService: ClientsService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.gettClients();


  }


  gettClients() {
    this.clientService.getClients()
      .subscribe((data: any) => {
        this.clients = data.results;
        console.log('Los clientes registrados son ', this.clients);
      }, error => {
        console.log('Error');
      });
  }

  // Metodo paginator
  getPages(e): PageEvent {
    if (this.clients.length === 0) {
      this.pageSize = 25;
      return;
    }
    this.params.limit = e.pageSize;
    this.params.offset = this.params.limit * e.pageIndex;
    this.gettClients();
  }
  // ==========================================


}
