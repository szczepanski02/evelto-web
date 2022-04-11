import { SharedModule } from './../../shared/shared.module';
import { SidenavService } from './sidenav.service';
import { SidenavComponent } from './sidenav.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SharedTranslateModule } from 'src/app/shared/shared-translate.module';
import { _userDBMock } from 'src/app/shared/services/__mocks__/users.mock';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedTranslateModule, SharedModule],
      declarations: [SidenavComponent],
      providers: [SidenavService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
