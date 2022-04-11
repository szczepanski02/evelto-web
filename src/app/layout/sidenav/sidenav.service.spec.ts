import { SidenavService, SidenavViews } from './sidenav.service';
import { TestBed } from '@angular/core/testing';

describe('SidenavService', () => {
  let service: SidenavService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidenavService],
    });
    service = TestBed.inject(SidenavService);
    spyOn(service, 'setActiveItem').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return active item', () => {
    service.getActiveItem().subscribe((item) => {
      expect(item).toEqual(SidenavViews.HOME);
    });
  });

  it('should set new active item', () => {
    service.setActiveItem(SidenavViews.ABOUT);
    service
      .getActiveItem()
      .subscribe((item) => expect(item).toEqual(SidenavViews.ABOUT));
    expect(service.setActiveItem).toHaveBeenCalledOnceWith(SidenavViews.ABOUT);
  });
});
