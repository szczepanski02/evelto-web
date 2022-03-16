import { Subscription } from 'rxjs';
import { ToastMessageService } from './../../../shared/reusable-components/toast-message/toast-message.service';
import { AuthService } from './../../../shared/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { toastMessageType } from 'src/app/shared/constants/toastMessageType';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  emailValue = '';
  passwordValue = '';
  isSubmitButtonActive = false;
  localAuthSubscription?: Subscription;

  constructor(
    private readonly authService: AuthService,
    private readonly toastMessageService: ToastMessageService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.localAuthSubscription?.unsubscribe();
  }

  inputValueChanged(): void {
    if(this.emailValue.length > 6 && this.passwordValue.length > 4) {
      this.isSubmitButtonActive = true;
    } else {
      this.isSubmitButtonActive = false;
    }
  }

  localStrategyLoginSubmit(): void {
    const payload = { email: this.emailValue, password: this.passwordValue };
    this.localAuthSubscription = this.authService.login(payload).subscribe(response => {
      console.log(response);
      this.toastMessageService.setMessage('Authorization', 'Sign in success', toastMessageType.INFO, 5);
    });
  }

  test(): void {
    this.authService.getUserFromToken().subscribe(response => {
      console.log(response);
    })
  }

}
