import { Component } from '@angular/core';
import { PwaService } from './services/pwa.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Scooter';

  constructor(private pwaService: PwaService) {

    this.pwaService.avaiableUpdate();
    this.installPwa();

  }

  installPwa() {
    if (this.pwaService.promptEvent) {
      this.pwaService.promptEvent.prompt();
    }
  }
}
