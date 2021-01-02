import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportRoutingModule } from './support-routing.module';
import { MainSupportComponent } from './main-support/main-support.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { ChatContentComponent } from './chat-content/chat-content.component';
import { ConversationHeaderComponent } from './chat-content/conversation-header/conversation-header.component';
import { ConversationBodyComponent } from './chat-content/conversation-body/conversation-body.component';
import { ConversationFooterComponent } from './chat-content/conversation-footer/conversation-footer.component';


@NgModule({
  declarations: [MainSupportComponent, TicketListComponent, ChatContentComponent, ConversationHeaderComponent, ConversationBodyComponent, ConversationFooterComponent],
  imports: [
    CommonModule,
    SupportRoutingModule
  ]
})
export class SupportModule { }
