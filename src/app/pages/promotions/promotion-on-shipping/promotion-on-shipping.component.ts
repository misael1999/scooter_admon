import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Router, RouterModule } from '@angular/router';
import { ClientsService } from 'src/app/services/clients.service';
import { PromotionsService } from 'src/app/services/promotions.service';
import { ValidationForms } from 'src/app/utils/validations-forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-promotion-on-shipping',
  templateUrl: './promotion-on-shipping.component.html',
  styleUrls: ['./promotion-on-shipping.component.scss']
})
export class PromotionOnShippingComponent extends ValidationForms implements OnInit {

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

  daysForm: FormGroup;
  selectedClients: Array<any> = [];

  constructor(private clientsService: ClientsService,
    private promotionsService: PromotionsService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.buildForm();
    this.searchText = this.clientsService.searchText;
    this.getClients();
  }

  buildForm() {
    this.daysForm = this.fb.group({
      quantity_days_validity: ['', Validators.required],
    })
  }


  createPromotion() {
    if (this.daysForm.invalid) {
      this.daysForm.markAllAsTouched();
      return;
    }
    if (this.selectedClients.length == 0) {
      Swal.fire({
        title: 'Error',
        type: 'error',
        text: 'No hay usuarios seleccionados',
        timer: 2000
      });
      return;
    }

    let quantity_days_validity = this.daysForm.value.quantity_days_validity;

    let ids = [];
    this.selectedClients.forEach((client) => {
      ids.push(client.id)
    })

    let params = {
      customer_ids: ids,
      quantity_days_validity: quantity_days_validity
    }

    this.promotionsService.createPromotion(params)
      .subscribe((data: any) => {
        console.log(data);
        Swal.fire({
          title: data.message,
          type: 'success',
          text: 'La promociones han sido creadas satisfactoriamente.',
          timer: 2000
        });
      });

    this.router.navigate(['/promotions/list']);
  }

  getClients() {
    this.loadingClient = true;
    this.clientsService.getClients(this.params)
      .subscribe((data: any) => {
        this.clients = data.results;
        // console.log(this.clients);
        this.length = data.count;
        this.mapClients();
        this.loadingClient = false;
      }, error => {
        this.loadingClient = false;
      });
  }

  mapClients() {
    console.log('Entra en mapear');

    this.clients.forEach((client) => {
      this.selectedClients.forEach((sClient) => {

        if (sClient.id == client.id) {
          client.is_selected = true;
          console.log('Entro');

        }
      })
    });
  }

  selectClient(client, event) {
    //=== ADD FIRTS CLIENT TO LIST ===//
    if (this.selectedClients.length == 0) {
      this.selectedClients.push(client);
    } else {
      //=====VERIFY EVENT===//
      if (event) {
        this.selectedClients.push(client);
      } else {
        let index = this.selectedClients.indexOf(client);
        this.selectedClients.splice(index, 1);
        console.log('Es falso index', index);
      }
    }
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
