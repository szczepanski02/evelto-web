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
            register(data: IRegisterPayload) {
              return;
            },
          },
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
