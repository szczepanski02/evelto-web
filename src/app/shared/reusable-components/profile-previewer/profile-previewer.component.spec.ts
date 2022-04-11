import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePreviewerComponent } from './profile-previewer.component';

describe('ProfilePreviewerComponent', () => {
  let component: ProfilePreviewerComponent;
  let fixture: ComponentFixture<ProfilePreviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePreviewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePreviewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
