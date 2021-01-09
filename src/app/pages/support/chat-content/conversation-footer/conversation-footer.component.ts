import { Component, Input, OnInit } from '@angular/core';
import { SupportService } from 'src/app/services/support.service';

@Component({
  selector: 'app-conversation-footer',
  templateUrl: './conversation-footer.component.html',
  styleUrls: ['./conversation-footer.component.scss']
})
export class ConversationFooterComponent implements OnInit {

  @Input() support;
  @Input() messages = [];

  constructor(private supportService: SupportService) { }

  ngOnInit(): void {
  }

  sendMessage(text) {
    if (text == null || text == '' || text == undefined) return;

    this.supportService.sendMessageSupport(this.support.id,{text})
      .subscribe((data: any) => {
        this.messages.push(data);
    }, error => {
      alert('Error al enviar el mensaje');
    });

  }

}
