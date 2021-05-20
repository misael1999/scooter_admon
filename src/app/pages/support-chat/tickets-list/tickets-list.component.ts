import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { SupportService } from 'src/app/services/support.service';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss']
})
export class TicketsListComponent implements OnInit {

  placement: NzDrawerPlacement = 'left';
  @Input() visible: boolean;
  @Output() is_closed = new EventEmitter<boolean>();
  @Output() supportSelectedEvent = new EventEmitter<boolean>();


  loadingSupports = false;
  // Info
  supports = [];
  params = { limit: 10, offset: 0, is_open: 'true' };
  supportSelected;

  constructor(private supportService: SupportService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
    this.visible ? this.getSupports() : null;
  }

  close(): void {
    this.is_closed.emit(false);
  }

  getSupports() {
    this.loadingSupports = true;
    this.supportService.getSupports(this.params)
      .subscribe((data: any) => {
        this.loadingSupports = false;
        this.supports = data.results;
      //  console.log('Supports', this.supports);

    }, error => {
      this.loadingSupports = false;
      alert('Ha ocurrido un error al obtener los tickets de soporte');
    });
  }

  supportSelect(support) {
    this.supportSelected = support;
    this.supportSelectedEvent.emit(support);
    this.close();
  }

  getSupportClass(supportTypeId) {
    switch (supportTypeId) {
      case 1:
        return 'badge-secondary';
      case 2:
        return 'badge-warning';
      case 3:
        return 'badge-info';
      default:
        return 'badge-success';
    }
  }
}
