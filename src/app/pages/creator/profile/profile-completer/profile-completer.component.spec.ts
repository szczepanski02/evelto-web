import { SharedTranslateModule } from 'src/app/shared/shared-translate.module';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { JwtService } from './../../../../shared/services/jwt.service';
import { UserService } from 'src/app/shared/services/user.service';
import { FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCompleterComponent } from './profile-completer.component';
import { _userDBMock } from 'src/app/shared/services/__mocks__/users.mock';

describe('ProfileCompleterComponent', () => {
  let component: ProfileCompleterComponent;
  let fixture: ComponentFixture<ProfileCompleterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedTranslateModule],
      declarations: [ProfileCompleterComponent],
      providers: [
        FormBuilder,
        {
          provide: UserService,
          useValue: {
            getUserWithRelations() { }
          }
        },
        {
          provide: JwtService,
          useValue: {
            setAccesstoken() { }
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        },
        {
          provide: AuthService,
          useValue: {
            getAuthorizatedUser() {
              return _userDBMock[0];
            }
          }
        },
        {
          provide: MatDialogRef,
          useValue: {
            close: jasmine.createSpy('close')
          }
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            firstName: 'Jan',
            lastName: 'Kowalski'
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCompleterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
