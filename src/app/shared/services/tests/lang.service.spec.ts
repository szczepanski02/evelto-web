import { SharedTranslateModule } from './../../shared-translate.module';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from 'src/app/shared/services/lang.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { _userDBMock } from '../__mocks__/users.mock';
import { Lang } from '../../constants/lang';

describe('LangService', () => {
  let service: LangService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedTranslateModule],
      providers: [
        LangService,
        TranslateService,
        {
          provide: AuthService,
          useValue: {
            getAuthorizatedUser: () => ({
              id: _userDBMock[1].id,
              username: _userDBMock[1].username,
              firstName: _userDBMock[1].firstName,
              lastName: _userDBMock[1].lastName,
              lang: _userDBMock[1].lang,
              accountType: _userDBMock[1].accountType,
              isActive: _userDBMock[1].isActive,
            }),
          },
        },
      ],
    });
    service = TestBed.inject(LangService);
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
    spyOn(service, 'setTranslateServiceLang').and.callFake(() => {});
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set new lang', () => {
    service.setLang(Lang.EN);
    expect(window.localStorage.getItem(service.CLIENT_LANG_LC)).toBe(Lang.EN);

    const req = httpMock.expectOne(`${service.api}`, Lang.EN);
    expect(req.request.method).toBe('PUT');
    req.flush(null);
  });

  it('should return current client lang', () => {
    spyOn(service, 'setLang').and.callFake(() => {});
    expect(service.getLang()).toBe(Lang.PL);
    window.localStorage.setItem(service.CLIENT_LANG_LC, Lang.EN);
    expect(service.getLang()).toBe(Lang.EN);
  });
});
