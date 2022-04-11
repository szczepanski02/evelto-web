import { _userDBMock } from 'src/app/shared/services/__mocks__/users.mock';
import { HomeComponent } from './home.component';
import { SharedTranslateModule } from './../../../shared/shared-translate.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/shared/services/auth.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedTranslateModule],
      providers: [
        {
          provide: AuthService,
          useValue: {
            getAuthorizatedUser: () => ({
              id: _userDBMock[0].id,
              username: _userDBMock[0].username,
              firstName: _userDBMock[0].firstName,
              lastName: _userDBMock[0].lastName,
              lang: _userDBMock[0].lang,
              accountType: _userDBMock[0].accountType,
              isActive: _userDBMock[0].isActive,
            }),
          },
        },
      ],
      declarations: [HomeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
