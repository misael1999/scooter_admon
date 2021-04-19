import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatSupportComponent } from './chat-support/chat-support.component';
import { FormsModule } from '@angular/forms';
import { TicketsListComponent } from './tickets-list/tickets-list.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DirectivesModule } from 'src/app/directives/directives.module';

@NgModule({
  declarations: [
    ChatSupportComponent,
    TicketsListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DirectivesModule,
    NzDrawerModule,
    InfiniteScrollModule,
    SnotifyModule
  ],
  exports: [
    ChatSupportComponent
  ],
  providers: [
    SnotifyService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
  ]
})
export class SupportChatModule { }
