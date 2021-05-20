import { Component, OnInit } from '@angular/core';
import { MerchantsService } from 'src/app/services/merchants.service';

@Component({
  selector: 'app-tab-reviews',
  templateUrl: './tab-reviews.component.html',
  styleUrls: ['./tab-reviews.component.scss']
})
export class TabReviewsComponent implements OnInit {
  loadingData: boolean;
  reviews;

  constructor(private merchantsService: MerchantsService) { }

  ngOnInit(): void {
    this.getReviews();
  }

  getReviews() {
    this.loadingData = true;
    this.merchantsService.getReviews(this.merchantsService.merchantId)
      .subscribe((data: any) => {
        this.loadingData = false;
        this.reviews = data;
        console.log(this.reviews);
      }, error => {
        console.log(error);
        this.loadingData = false;
      });
  }

}
