import { Subscription } from 'rxjs';
import { AuthService } from './../../../shared/services/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  readonly api = `${environment.apiUrl}/auth`;

  emailValue = '';
  passwordValue = '';
  isSubmitButtonActive = false;
  localAuthSubscription?: Subscription;

  constructor(
    readonly authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.localAuthSubscription?.unsubscribe();
  }

  inputValueChanged(): void {
    if (this.emailValue.length > 6 && this.passwordValue.length > 4) {
      this.isSubmitButtonActive = true;
    } else {
      this.isSubmitButtonActive = false;
    }
  }

  localStrategyLoginSubmit(): void {
    const payload = { email: this.emailValue, password: this.passwordValue };
    this.authService.login(payload);
  }

  googleStrategyLoginSubmit(): void {
    window.open(`${this.api}/auth-google`, "_self");
  }

  handleKeyUp(e: any) {
    if (e.keyCode === 13 && this.isSubmitButtonActive) {
      this.localStrategyLoginSubmit();
    }
  }

}