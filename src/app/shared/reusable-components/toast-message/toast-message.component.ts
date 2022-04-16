import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IToastMessage, ToastMessageService } from './toast-message.service';

@Component({
  selector: 'app-toast-message',
  templateUrl: './toast-message.component.html',
  styleUrls: ['./toast-message.component.scss']
})
export class ToastMessageComponent implements OnInit, OnDestroy {

  messages: IToastMessage[] = [];
  messagesSubscription?: Subscription;

  constructor(readonly toastMessageService: ToastMessageService) { }

  ngOnInit(): void {
    this.messagesSubscription = this.toastMessageService.getMessages().subscribe(message => {
      this.handleNewMessage(message);
    });
  }

  handleNewMessage(message: IToastMessage): void {
    this.messages.push(message);
    this.stackScrollTo();
    setTimeout(() => {
      this.handleMessageDelete(message);
    }, message.expirationTime * 1000);
  }

  handleMessageDelete(message: IToastMessage): void {
    const messageDomEl: NodeListOf<HTMLElement> = document.querySelectorAll('.toast-message__container');
    messageDomEl[this.messages.indexOf(message)]?.classList.remove('slide-in-right');
    messageDomEl[this.messages.indexOf(message)]?.classList.add('slide-out-right');
    setTimeout(() => {
      this.messages.splice(this.messages.indexOf(message), 1);
    }, 300);
  }

  stackScrollTo(): void {
    const messagesWall = document.querySelector<HTMLElement>('.toast-message__wall');
    if (!messagesWall) {
      return;
    }
    messagesWall.scroll({
      top: messagesWall.scrollHeight,
      behavior: "smooth"
    });
  }

  ngOnDestroy(): void {
    this.messagesSubscription?.unsubscribe();
  }

}
