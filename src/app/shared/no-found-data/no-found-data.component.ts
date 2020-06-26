import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-no-found-data',
  templateUrl: './no-found-data.component.html',
  styleUrls: ['./no-found-data.component.scss']
})
export class NoFoundDataComponent implements OnInit {

  @Input() message = 'No hay datos que mostrar';

  constructor() { }

  ngOnInit(): void {
  }

}
