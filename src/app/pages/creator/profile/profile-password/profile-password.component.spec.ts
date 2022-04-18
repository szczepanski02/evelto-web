import { SharedTranslateModule } from 'src/app/shared/shared-translate.module';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePasswordComponent } from './profile-password.component';

describe('ProfilePasswordComponent', () => {
  let component: ProfilePasswordComponent;
  let fixture: ComponentFixture<ProfilePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SharedTranslateModule
      ],
      declarations: [ProfilePasswordComponent],
      providers: [
        FormBuilder,
        {
          provide: MatDialogRef,
          useValue: {
            close: jasmine.createSpy('close')
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
