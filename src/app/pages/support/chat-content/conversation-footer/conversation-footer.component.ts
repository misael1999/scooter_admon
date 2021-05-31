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
  @ViewChild('inputFile') inputFile: ElementRef;
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
      console.log(params);

    });
  }

  ngOnInit(): void {
    this.setTraductionEmojis();
    this.station = JSON.parse(localStorage.getItem('station'));
    console.log(this.support);

  }

  sendMessage(text) {

    if (text == null || text == '' || text == undefined) { return; }
    // Mensaje temporal
    const newMessageModel = new MessageSupportModel(
      this.station.user.id,
      this.support.user,
      this.messageText,
      new Date());
    this.messageText = null;
    // ======= Enviar mensaje ========
    console.log(this.support);
    this.newMessage.emit(newMessageModel);

    this.supportService.sendMessageSupport(this.chatId, { text })
      .subscribe((data: any) => {
        // this.messages.push(data);
        // this.showSwalMessage("Mensaje enviado", 'success')
      }, error => {
        alert('Error al enviar el mensaje');
      });

  }

  selectFileMedia(evt) {

    const file = evt.target.files[0];

    if (!file) {
      // formTemp.get('picture').setValue(this.sliders[index].picture);
      // this.slidersArrayForm.controls[index] = formTemp;
      return;
    }
    if (file.type.indexOf('image') < 0 && file.type.indexOf('application/pdf') < 0) {

      // this.myInputVariable.nativeElement.value = '';
      this.showSwalMessage('El archivo seleccionado no es tipo permitido', 'error');
      // formTemp.get('picture').setValue(this.sliders[index].picture);
      // this.slidersArrayForm.controls[index] = formTemp;
      return;
    }

    const reader = new FileReader();
    reader.onload = this.handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
    // setTimeout(() => {
    //   this.updatedDocument(documentId, this.binaryString, file.name);
    // }, 100);
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

  handleReaderLoaded(e) {
    this.binaryString = btoa(e.target.result);
  }

  deleteImage() {
    this.binaryString = null;
    this.inputFile.nativeElement.value = null;
  }
}
