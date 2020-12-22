import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.scss']
})
export class OrdersDetailComponent implements OnInit {
  details: Array<any> = [];

  constructor(
    public dialogRef: MatDialogRef<OrdersDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.details = data.details;
    console.log(this.details);
  }

  ngOnInit(): void {
  }

}
