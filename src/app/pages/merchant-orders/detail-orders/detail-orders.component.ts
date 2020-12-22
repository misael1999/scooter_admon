import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detail-orders',
  templateUrl: './detail-orders.component.html',
  styleUrls: ['./detail-orders.component.scss']
})
export class DetailOrdersComponent implements OnInit {
  details: Array<any> = [];

  constructor(
    public dialogRef: MatDialogRef<DetailOrdersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.details = data.details;
    console.log(this.details);
  }

  ngOnInit(): void {
  }

}
