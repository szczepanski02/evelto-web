import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarDropdownComponent } from './topbar-dropdown.component';

describe('TopbarDropdownComponent', () => {
  let component: TopbarDropdownComponent;
  let fixture: ComponentFixture<TopbarDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopbarDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopbarDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
