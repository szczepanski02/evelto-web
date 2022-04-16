import { IRegisterPayload } from './../../../shared/services/auth.service';
import { Lang } from 'src/app/shared/constants/lang';
import { LangService } from 'src/app/shared/services/lang.service';
import { RegisterPageComponent } from './register-page.component';
import { SharedTranslateModule } from './../../../shared/shared-translate.module';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';

describe('RegisterPageComponent', () => {
  let component: RegisterPageComponent;
  let fixture: ComponentFixture<RegisterPageComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedTranslateModule],
      declarations: [RegisterPageComponent],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: () => { }
          }
        },
        {
          provide: LangService,
          useValue: {
            getLang() {
              return Lang.EN;
            },
          },
        },
        FormBuilder,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    spyOn(component.authService, 'register');
  });

  describe('ngOnInit', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should set forms', () => {
      // WHEN
      component.ngOnInit();

      // THEN
      expect(component.primaryAccountFormData).toBeDefined();
      expect(component.passwordsAccountFormData).toBeDefined();
      expect(component.detailsAccountFormData).toBeDefined();
      expect(component.addressAccountFormData).toBeDefined();
    });
  });

  describe('validators', () => {

    describe('primary form', () => {
      it('should throw required errors', () => {
        expect(component.fPrimary['username'].hasError('required')).toBeTruthy();
        expect(component.fPrimary['firstName'].hasError('required')).toBeTruthy();
        expect(component.fPrimary['lastName'].hasError('required')).toBeTruthy();
      });
      it('should throw minLength erorrs', () => {
        // GIVEN
        component.primaryAccountFormData.patchValue({
          username: 'a',
          firstName: 'a',
          lastName: 'a'
        });
        // EXPECT
        expect(component.fPrimary['username'].hasError('minlength')).toBeTruthy();
        expect(component.fPrimary['firstName'].hasError('minlength')).toBeTruthy();
        expect(component.fPrimary['lastName'].hasError('minlength')).toBeTruthy();
      })
      it('should throw maxLength errors', () => {
        // GIVEN
        component.primaryAccountFormData.patchValue({
          username: '123456789123456789',
          firstName: '123456789123456789123456789123456789123456789',
          lastName: '123456789123456789123456789123456789123456789'
        });
        // EXPECT
        expect(component.fPrimary['username'].hasError('maxlength')).toBeTruthy();
        expect(component.fPrimary['firstName'].hasError('maxlength')).toBeTruthy();
        expect(component.fPrimary['lastName'].hasError('maxlength')).toBeTruthy();
      });
    });

    describe('passwords form', () => {
      it('should throw required errors', () => {
        expect(component.fPass['password'].hasError('required')).toBeTruthy();
        expect(component.fPass['confirmPassword'].hasError('required')).toBeTruthy();
      });
      it('should throw minLength errors', () => {
        // GIVEN
        component.passwordsAccountFormData.patchValue({
          password: 'wrong',
        });
        // THEN
        expect(component.fPass['password'].hasError('minlength')).toBeTruthy();
      });
      it('should throw maxlength errors', () => {
        // GIVEN
        component.passwordsAccountFormData.patchValue({
          password: '12345678912345678912345678912345678912345678912',
        });
        // THEN
        expect(component.fPass['password'].hasError('maxlength')).toBeTruthy();
      });
      it('should throw confirmedValidator error', () => {
        // GIVEN
        // GIVEN
        component.passwordsAccountFormData.patchValue({
          password: 'somePassword',
          confirmPassword: 'someOtherPassword'
        });
        expect(component.fPass['confirmPassword'].hasError('confirmedValidator')).toBeTruthy();
      });
    });
  });

  describe('submit', () => {
    it('should call authService.register', () => {
      // GIVEN
      component.primaryAccountFormData.patchValue({
        username: 'janKowalski',
        firstName: 'Jan',
        lastName: 'Kowalski',
        email: 'jan.kowalski@domain.com'
      });
      component.passwordsAccountFormData.patchValue({
        password: 'somePassword',
        confirmPassword: 'somePassword'
      });

      // WHEN
      component.submit();

      // THEN
      expect(component.authService.register).toHaveBeenCalledTimes(1);
    });
  });

});
