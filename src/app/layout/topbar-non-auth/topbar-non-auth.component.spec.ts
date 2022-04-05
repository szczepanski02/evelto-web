import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarNonAuthComponent } from './topbar-non-auth.component';

describe('TopbarNonAuthComponent', () => {
  let component: TopbarNonAuthComponent;
  let fixture: ComponentFixture<TopbarNonAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopbarNonAuthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbarNonAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
