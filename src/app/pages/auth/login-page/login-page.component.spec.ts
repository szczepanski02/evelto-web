import { SharedTranslateModule } from './../../../shared/shared-translate.module';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoginPageComponent } from './login-page.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  let mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedTranslateModule],
      declarations: [LoginPageComponent],
      providers: [
        {
          provide: AuthService, useValue: {
            login: () => { },
          }
        },
        { provide: Router, useValue: mockRouter }
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(component.authService, 'login');
    spyOn(window, 'open');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('inputValueChanged', () => {
    it('should set isSubmitButtonActive = true', () => {
      expect(component.isSubmitButtonActive).toBeFalsy();

      // GIVEN
      component.emailValue = 'jan.kowalski@domain.com';
      component.passwordValue = 'some-password';

      // WHEN
      component.inputValueChanged();

      // THEN
      expect(component.isSubmitButtonActive).toBeTruthy();
    });
  });

  describe('localStrategyLoginSubmit', () => {
    it('should call to authService.login', () => {
      // GIVEN
      component.emailValue = 'jan.kowalski@domain.com';
      component.passwordValue = 'some-password';

      // WHEN
      component.localStrategyLoginSubmit();

      // THEN
      expect(component.authService.login).toHaveBeenCalledOnceWith({
        email: component.emailValue,
        password: component.passwordValue
      });
    });
  });
});
