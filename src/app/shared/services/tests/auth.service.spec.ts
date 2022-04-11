import { Lang } from 'src/app/shared/constants/lang';
import { CountriesEnum } from './../../constants/countries';
import { IAuthorizatedUser } from 'src/app/shared/interfaces/AuthorizatedUser';
import { AccountType } from './../../constants/account-type';
import { JwtService } from './../jwt.service';
import { TranslateService } from '@ngx-translate/core';
import {
  AuthService,
  IRegisterPayload,
} from 'src/app/shared/services/auth.service';
import { fakeAsync, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { _userDBMock } from '../__mocks__/users.mock';
import { SharedTranslateModule } from '../../shared-translate.module';
import { Router } from '@angular/router';
import { ToastMessageService } from '../../reusable-components/toast-message/toast-message.service';
import { toastMessageType } from '../../constants/toastMessageType';
import { HttpResponseMock } from '../__mocks__/HttpResponse.mock';
import { Gender } from '../../constants/gender';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedTranslateModule],
      providers: [
        AuthService,
        TranslateService,
        ToastMessageService,
        {
          provide: JwtService,
          useValue: {
            setAccessToken(token: string): void {
              window.localStorage.setItem('access_token', token);
            },
            setRefreshToken(token: string): void {
              window.localStorage.setItem('refresh_token', token);
            },
            getRefreshToken(): string | null {
              return window.localStorage.getItem('refresh_token');
            },
          },
        },
        { provide: Router, useValue: mockRouter },
      ],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);

    // local storage mock
    let store: any = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear').and.callFake(mockLocalStorage.clear);

    spyOn(service, 'setSession').and.callThrough();
    spyOn(service, 'redirect');
    spyOn(service.toastMessageService, 'setMessage');
    spyOn(service.jwtService, 'setAccessToken');
    spyOn(service.jwtService, 'setRefreshToken');
    spyOn(service, 'setIsAuthorizated').and.callThrough();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('register', () => {
    it('should create new account and redirect client to login page', fakeAsync(() => {
      const payload: IRegisterPayload = {
        accountType: AccountType.CREATOR,
        firstName: 'Jan',
        lastName: 'Kowalski',
        username: 'j.kowalski',
        email: 'j.kowalski@domain.com',
        password: 'password',
        profileImg: '',
        birthDate: new Date(),
        gender: Gender.MALE,
        country: CountriesEnum.POLAND,
        city: 'Cracow',
        zipCode: '32-064',
        address1: 'Wroclawska 22',
        lang: Lang.PL,
      };

      service.register(payload);

      const req = httpMock.expectOne(`${service.api}/register`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(payload);
      req.flush(HttpResponseMock(201, 'Account has been created successfully'));

      expect(service.toastMessageService.setMessage).toHaveBeenCalledWith(
        service.translateService.instant('auth.notificationTitle'),
        'Account has been created successfully',
        toastMessageType.INFO,
        5
      );
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth/login']);
    }));
  });

  describe('loginSuccessHandler', () => {
    it('should handle login success response and provide corresponding action', fakeAsync(() => {
      const data = {
        access_token: 'someMockedAccessToken',
        refresh_token: 'someMockedRefreshToken',
        accountType: AccountType.CREATOR,
      };
      service.loginSuccessHandler(data);

      expect(service.setSession).toHaveBeenCalledOnceWith(
        data.access_token,
        data.refresh_token
      );
      expect(service.toastMessageService.setMessage).toHaveBeenCalledOnceWith(
        service.translateService.instant('auth.notificationTitle'),
        service.translateService.instant('auth.signSuccess'),
        toastMessageType.INFO,
        5
      );
      expect(service.redirect).toHaveBeenCalled();
    }));

    it('should throw error if user account type is not a CREATOR', fakeAsync(() => {
      const data = {
        access_token: 'someMockedAccessToken',
        refresh_token: 'someMockedRefreshToken',
        accountType: AccountType.CLIENT,
      };
      service.loginSuccessHandler(data);
      expect(service.setSession).toHaveBeenCalledTimes(0);
      expect(service.toastMessageService.setMessage).toHaveBeenCalledOnceWith(
        service.translateService.instant('auth.notificationTitle'),
        service.translateService.instant('auth.notCreator'),
        toastMessageType.ERROR,
        5
      );
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth/login']);
    }));
  });

  describe('thirdPartLogin', () => {
    const data = {
      access_token: 'someMockedAccessToken',
      refresh_token: 'someMockedRefreshToken',
      accountType: AccountType.CREATOR,
    };
    it('should run loginSuccessHandler with data', () => {
      spyOn(service, 'loginSuccessHandler');
      service.thirdPartLogin(data);
      expect(service.loginSuccessHandler).toHaveBeenCalledWith(data);
    });
  });

  describe('getUserFromToken', () => {
    it('should return user from token', fakeAsync(() => {
      const responseUser: IAuthorizatedUser = {
        id: _userDBMock[1].id,
        username: _userDBMock[1].username,
        firstName: _userDBMock[1].firstName,
        lastName: _userDBMock[1].lastName,
        lang: _userDBMock[1].lang,
        accountType: _userDBMock[1].accountType,
        isActive: _userDBMock[1].isActive,
      };
      window.localStorage.setItem('access_token', 'someMockedAccessToken');
      service.getUserFromToken().subscribe((response) => {
        expect(response.body).toEqual(responseUser);
      });
      const req = httpMock.expectOne(`${service.api}/authorize`);
      expect(req.request.method).toBe('GET');
      req.flush(HttpResponseMock(200, responseUser));
    }));
  });

  describe('logout', () => {
    it('should clear local storage and redirect to login page', fakeAsync(() => {
      service.logout();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth/login']);
      expect(service.jwtService.setAccessToken).toHaveBeenCalledWith(null);
      expect(service.jwtService.setRefreshToken).toHaveBeenCalledWith(null);
      expect(service.setIsAuthorizated).toHaveBeenCalledWith(false);
    }));
  });

  describe('isCreator', () => {
    it('should return true if authorizated user is a creator', () => {
      expect(service.isCreator()).toBeFalsy(); // user is not authorizated
    });
  });

  describe('setSession', () => {
    it('should call to jwtService and change state of authorization user', () => {
      const access_token = 'someMockedAccessToken';
      const refresh_token = 'someMockedRefreshToken';
      service.setSession(access_token, refresh_token);
      expect(service.setIsAuthorizated).toHaveBeenCalledWith(true);
      expect(service.jwtService.setAccessToken).toHaveBeenCalledWith(
        access_token
      );
      expect(service.jwtService.setRefreshToken).toHaveBeenCalledWith(
        refresh_token
      );
    });
  });

  describe('refreshSession', () => {
    const responseData = {
      access_token: 'someMockedAccessToken',
      refresh_token: 'someMockedRefreshToken',
      accountType: AccountType.CREATOR,
    };

    it('should return new tokens', fakeAsync(() => {
      service.refreshSession().subscribe((response) => {
        expect(response.body).toEqual(responseData);
      });
      const req = httpMock.expectOne(`${service.api}/refresh`);
      expect(req.request.method).toBe('POST');
      req.flush(HttpResponseMock(200, responseData));
    }));
  });

  describe('redirectToLoginPage', () => {
    it('should redirect and throw error message', () => {
      service.redirectToLoginPage();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/auth/login']);
      expect(service.toastMessageService.setMessage).toHaveBeenCalledWith(
        service.translateService.instant('auth.notificationTitle'),
        service.translateService.instant('auth.signInToContinue'),
        toastMessageType.ERROR,
        5
      );
    });
  });

  describe('redirectUrl operations', () => {
    it('shoult set new redirect url', () => {
      service.setRedirectUrl('someUrl');
      expect(window.localStorage.getItem(service._redirectLs)).toEqual(
        'someUrl'
      );
    });

    it('should get redirect url', () => {
      window.localStorage.setItem(service._redirectLs, 'someUrl');
      expect(service.getRedirectUrl()).toEqual('someUrl');
    });

    it('should delete redirect url', () => {
      window.localStorage.setItem(service._redirectLs, 'someUrl');
      service.deleteRedirectUrl();
      expect(window.localStorage.getItem(service._redirectLs)).toBeNull();
    });
  });

  describe('isAuthorizated', () => {
    it('should set isAuthorizated and secondly get authorization state', () => {
      service.setIsAuthorizated(true);
      service.getIsAuthorizated().subscribe((response) => {
        expect(response).toBeTruthy();
      });
    });
  });

  describe('authorizatedUser', () => {
    const authorizatedUserData: IAuthorizatedUser = {
      id: _userDBMock[1].id,
      username: _userDBMock[1].username,
      firstName: _userDBMock[1].firstName,
      lastName: _userDBMock[1].lastName,
      lang: _userDBMock[1].lang,
      accountType: _userDBMock[1].accountType,
      isActive: _userDBMock[1].isActive,
    };
    it('should set authorizated user and secondly get storaging data', () => {
      service.setAuthorizatedUser(authorizatedUserData);
      expect(service.getAuthorizatedUser()).toEqual(authorizatedUserData);
    });
  });
});
