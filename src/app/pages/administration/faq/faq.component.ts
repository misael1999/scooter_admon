import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddFaqComponent } from './add-faq/add-faq.component';
import { FaqService } from '../../../services/faq.service';

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


  addFaq(faq = null) {
    this.dialog.open(AddFaqComponent, {
      disableClose: true,
      width: '50%',
      height: '50%',
      data: {}
    });
  }


  addGroupFaq() {

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
}
