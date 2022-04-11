import { TopbarNonAuthDropdownComponent } from './topbar-non-auth-dropdown.component';
import { Lang } from 'src/app/shared/constants/lang';
import { ToastMessageService } from 'src/app/shared/reusable-components/toast-message/toast-message.service';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from 'src/app/shared/services/lang.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SharedModule } from './../../../shared/shared.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedTranslateModule } from 'src/app/shared/shared-translate.module';
import { _userDBMock } from 'src/app/shared/services/__mocks__/users.mock';
import { of } from 'rxjs';

describe('TopbarNonAuthDropdownComponent', () => {
  let component: TopbarNonAuthDropdownComponent;
  let fixture: ComponentFixture<TopbarNonAuthDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedTranslateModule, SharedModule, HttpClientTestingModule],
      declarations: [TopbarNonAuthDropdownComponent],
      providers: [
        TranslateService,
        ToastMessageService,
        {
          provide: LangService,
          useValue: {
            getLang(): Lang {
              return Lang.EN;
            },
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbarNonAuthDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
