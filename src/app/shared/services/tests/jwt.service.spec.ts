import { JwtService } from './../jwt.service';
import { TestBed } from '@angular/core/testing';
import { _userDBMock } from '../__mocks__/users.mock';

describe('JwtService', () => {
  let service: JwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JwtService],
    });
    service = TestBed.inject(JwtService);

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
  });

  it('should return access token', () => {
    const mockedAccessToken =
      'gruh34gnxdzczldk2okkoskfokjroko6kom423ymimfadspkf';
    window.localStorage.setItem(service._accessTokenLs, mockedAccessToken);
    expect(service.getAccessToken()).toEqual(mockedAccessToken);
  });

  it('should return refresh token', () => {
    const mockedRefreshToken =
      'gruh34gnxdzczldk2okkoskfokjroko6kom423ymimfadspkf';
    window.localStorage.setItem(service._refreshTokenLs, mockedRefreshToken);
    expect(service.getRefreshToken()).toEqual(mockedRefreshToken);
  });

  it('should set new access token ', () => {
    const mockedAccessToken = 'someMockedAccessToken';
    service.setAccessToken(mockedAccessToken);
    expect(window.localStorage.getItem(service._accessTokenLs)).toEqual(
      mockedAccessToken
    );
    service.setAccessToken(null);
    expect(window.localStorage.getItem(service._accessTokenLs)).toBeNull();
  });

  it('should set new refresh token', () => {
    const mockedRefreshToken = 'someMockedRefreshToken';
    service.setRefreshToken(mockedRefreshToken);
    expect(window.localStorage.getItem(service._refreshTokenLs)).toEqual(
      mockedRefreshToken
    );
    service.setRefreshToken(null);
    expect(window.localStorage.getItem(service._refreshTokenLs)).toBeNull();
  });
});
