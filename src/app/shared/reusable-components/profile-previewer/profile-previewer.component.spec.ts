import { PipesModule } from './../../pipes/pipes.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePreviewerComponent } from './profile-previewer.component';
import { SharedTranslateModule } from '../../shared-translate.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProfilePreviewerComponent', () => {
  let component: ProfilePreviewerComponent;
  let fixture: ComponentFixture<ProfilePreviewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, PipesModule, SharedTranslateModule],
      declarations: [ProfilePreviewerComponent]
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
