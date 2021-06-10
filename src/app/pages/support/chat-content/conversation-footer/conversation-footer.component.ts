import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MessageSupportModel } from 'src/app/models/message_support.model';
import { SupportService } from 'src/app/services/support.service';
import { ValidationForms } from 'src/app/utils/validations-forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-conversation-footer',
  templateUrl: './conversation-footer.component.html',
  styleUrls: ['./conversation-footer.component.scss']
})
export class ConversationFooterComponent extends ValidationForms implements OnInit {
  @Input() support;
  chatId;
  @Output() newMessage = new EventEmitter<MessageSupportModel>();
  messageText = '';
  station;
  loadingMessage: boolean;
  binaryString;
  isEmojiPickerVisible: boolean;
  i18nEmojis;

  constructor(
    private supportService: SupportService,
    private activatedRoute: ActivatedRoute
  ) {
    super();
    this.activatedRoute.params.subscribe((params) => {
      this.chatId = params.chatId;
    });
  }

  ngOnInit(): void {
    this.setTraductionEmojis();
    this.station = JSON.parse(localStorage.getItem('station'));
  }

  sendMessage(text) {
    text = text?.trim() ?? '';
    if (text === '' && !this.binaryString) { return; }

    let fileMedia;
    if (this.binaryString) {
      fileMedia = 'data:image/png;base64,' + this.binaryString;
    }

    // Mensaje temporal
    const newMessageModel = new MessageSupportModel(
      this.station.user.id,
      this.support.user,
      this.messageText,
      new Date());

    this.messageText = '';
    this.newMessage.emit(newMessageModel);

    this.supportService.sendMessageSupport(this.chatId, { text })
      .subscribe((data: any) => {
      }, error => {
        alert('Error al enviar el mensaje');
      });
  }

  addEmoji(event) {
    this.messageText = `${this.messageText}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
  }

  openEmoji() {
    setTimeout(() => {
      this.isEmojiPickerVisible = !this.isEmojiPickerVisible;
    }, 100);
  }

  clickOutside(event) {
    if (this.isEmojiPickerVisible) {
      this.isEmojiPickerVisible = false;
    }
  }

  setTraductionEmojis() {
    this.i18nEmojis = {
      search: 'Buscar',
      emojilist: 'Lista de imagenes',
      notfound: 'No se encontro la imagen',
      clear: 'Limpiar',
      categories: {
        search: 'Resultados de busqueda',
        recent: 'Usados frecuentemente',
        people: 'Emoticonos y personas',
        nature: 'Animales y naturaleza',
        foods: 'Comida y bebida',
        activity: 'Actividad',
        places: 'Viajes y lugares',
        objects: 'Objetos',
        symbols: 'Símbolos',
        flags: 'Banderas',
        custom: 'Personalizado',
      },
      skintones: {
        1: 'Default Skin Tone',
        2: 'Light Skin Tone',
        3: 'Medium-Light Skin Tone',
        4: 'Medium Skin Tone',
        5: 'Medium-Dark Skin Tone',
        6: 'Dark Skin Tone',
      },
    };
  }
}
