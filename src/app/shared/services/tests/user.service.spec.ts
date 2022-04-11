import { HttpResponseMock } from './../__mocks__/HttpResponse.mock';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from './../user.service';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { _userDBMock } from '../__mocks__/users.mock';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        {
          provide: AuthService,
          useValue: {
            getAuthorizatedUser: () => ({
              id: _userDBMock[1].id, // ID from users mock
            }),
          },
        },
      ],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get authorizated user with realtions', () => {
    service.getUserWithRelations().subscribe((response) => {
      const user = response.body;
      expect(user).toEqual(_userDBMock[1]);
    });
    const req = httpMock.expectOne(`${service.api}/getWithRelations`);
    expect(req.request.method).toBe('GET');
    req.flush(HttpResponseMock(200, _userDBMock[1]));
  });
});
