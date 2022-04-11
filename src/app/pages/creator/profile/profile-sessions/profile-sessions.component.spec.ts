import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSessionsComponent } from './profile-sessions.component';

describe('ProfileSessionsComponent', () => {
  let component: ProfileSessionsComponent;
  let fixture: ComponentFixture<ProfileSessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileSessionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
