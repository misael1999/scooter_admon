import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddFaqComponent } from './add-faq/add-faq.component';
import { FaqService } from '../../../services/faq.service';
import { AddGroupFaqComponent } from './add-group-faq/add-group-faq.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  loadingFaq: boolean;
  params = { search: '' };
  faqs: Array<any> = []

  constructor(private dialog: MatDialog, private faqService: FaqService) { }

  ngOnInit(): void {
    this.getFaq();
  }


  openDialogAddFaq(faq = null) {
    const dialogRef = this.dialog.open(AddFaqComponent, {
      minWidth: '60%',
      minHeight: '400px',
      data: { faq }
    });
    dialogRef.afterClosed()
      .subscribe((data: any) => {
        if (data) {
          this.getFaq();
        }
      });
  }

  openDialogAddGroup(group = null) {
    const dialogRef = this.dialog.open(AddGroupFaqComponent, {
      minWidth: '40%',
      minHeight: '200px',
      data: { group }
    });
    dialogRef.afterClosed()
      .subscribe((data: any) => {
        if (data) {
          this.getFaq();
        }
      })
  }




  getFaq() {
    this.loadingFaq = true;
    this.faqService.getFaq(this.params)
      .subscribe((data: any) => {
        this.loadingFaq = false;
        this.faqs = data;
        console.log(this.faqs);

      }, error => {
        this.loadingFaq = false;
        console.log('error ');

      });
  }


  dialogDeleteFaq(faq) {
    Swal.fire({
      title: 'Bloquear',
      text: `Esta seguro de bloquear a ${faq.title}`,
      type: 'warning',
      showConfirmButton: true,
      confirmButtonText: 'Bloquear',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then(resp => {
      if (resp.value) {
        this.faqService.deleteFaq(faq.id)
          .subscribe(data => {
            Swal.fire({
              title: 'Bloqueado',
              type: 'success',
              text: 'La Pregunta ha sido bloqueado',
              timer: 2000
            });
          });
      }
    });
  }

}
