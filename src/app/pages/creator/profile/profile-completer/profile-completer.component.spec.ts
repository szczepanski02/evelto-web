import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCompleterComponent } from './profile-completer.component';

describe('ProfileCompleterComponent', () => {
  let component: ProfileCompleterComponent;
  let fixture: ComponentFixture<ProfileCompleterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileCompleterComponent ]
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
