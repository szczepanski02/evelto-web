import { _userDBMock } from './../../../shared/services/__mocks__/users.mock';
import { of } from 'rxjs';
import { ProfileComponent } from './profile.component';
import { SharedTranslateModule } from './../../../shared/shared-translate.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from 'src/app/shared/services/user.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedTranslateModule],
      declarations: [ProfileComponent],
      providers: [
        {
          provide: UserService,
          useValue: {
            getUserWithRelations() {
              return of(_userDBMock[0]);
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
