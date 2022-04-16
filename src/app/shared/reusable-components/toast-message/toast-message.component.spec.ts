import { toastMessageType } from 'src/app/shared/constants/toastMessageType';
import { of } from 'rxjs';
import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { ToastMessageComponent } from './toast-message.component';
import { ToastMessageService } from './toast-message.service';

describe('ToastMessageComponent', () => {
  let component: ToastMessageComponent;
  let fixture: ComponentFixture<ToastMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ToastMessageComponent],
      providers: [ToastMessageService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(component, 'stackScrollTo');
    spyOn(component, 'handleMessageDelete');

    spyOn(component.toastMessageService, 'getMessages').and.callThrough();
    spyOn(component.toastMessageService, 'setMessage').and.callFake((title, content, type, time) => {
      component.messages.push({
        content: content,
        type: type,
        expirationTime: time,
        title: title,
        expirationDate: Math.floor(Date.now() / 1000) + 5
      });
    });
  });

  describe('ngOnInit', () => {

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should call getMessages', () => {
      // WHEN
      component.ngOnInit();

      //THEN
      expect(component.toastMessageService.getMessages).toHaveBeenCalled();
      expect(component.messagesSubscription).toBeTruthy();
    });

    it('should call getMessages, and set new messages into component array', fakeAsync(() => {
      // WHEN
      component.ngOnInit();

      // GIVEN
      component.toastMessageService.setMessage('content', 'title', toastMessageType.INFO, 5);
      component.toastMessageService.setMessage('content2', 'title2', toastMessageType.INFO, 5);

      // THEN
      expect(component.messages.length).toBe(2);
    }));
  });

  describe('handleNewMessage', () => {
    it('should throw new message to array and call to stackScrollTo and handleMessageDelete', () => {
      // GIVEN
      component.toastMessageService.setMessage('content', 'title', toastMessageType.INFO, 1);

      // WHEN
      component.handleNewMessage(component.messages[0]);

      // THEN
      expect(component.stackScrollTo).toHaveBeenCalledTimes(1);
      expect(component.handleMessageDelete).toHaveBeenCalledTimes(0);
      setTimeout(() => {
        expect(component.handleMessageDelete).toHaveBeenCalledTimes(1);
      }, component.messages[0].expirationTime * 1000);
    });
  });

  describe('ngOnDestroy', () => {
    it('should remove subscription', () => {
      // WHEN
      component.ngOnDestroy();

      // THEN
      expect(component.messagesSubscription?.closed).toBeTrue();
    });
  });
});
