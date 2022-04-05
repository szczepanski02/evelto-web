import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarNonAuthDropdownComponent } from './topbar-non-auth-dropdown.component';

describe('TopbarNonAuthDropdownComponent', () => {
  let component: TopbarNonAuthDropdownComponent;
  let fixture: ComponentFixture<TopbarNonAuthDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopbarNonAuthDropdownComponent ]
    })
    .compileComponents();
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
