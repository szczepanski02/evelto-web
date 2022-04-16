import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { AuthService } from 'src/app/shared/services/auth.service';

import { ProfileSessionsComponent } from './profile-sessions.component';

describe('ProfileSessionsComponent', () => {
  let component: ProfileSessionsComponent;
  let fixture: ComponentFixture<ProfileSessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileSessionsComponent],
      providers: [
        {
          provide: AuthService,
          useValue: {
            deleteRefreshTokenById: () => { }
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileSessionsComponent);
    component = fixture.componentInstance;
    component.refreshTokens = [
      {
        id: 1,
        ipAddress: '192.168.0.1',
        createdAt: new Date(),
        token: 'example-token'
      },
      {
        id: 2,
        ipAddress: '102.112.10.1',
        createdAt: new Date(),
        token: 'example-token-2'
      }
    ]
    fixture.detectChanges();

    spyOn(component.authService, 'deleteRefreshTokenById');
  });

  describe('ngOnInit', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should load tokens to data source', () => {
      // WHEN
      component.ngOnInit();

      // THEN
      expect(component.dataSource.data).toEqual(component.refreshTokens!);
    });
  });

  it('should delete call to backend and set new datasource', fakeAsync(() => {
    // WHEN
    component.delete(1);

    // THEN
    expect(component.authService.deleteRefreshTokenById).toHaveBeenCalledOnceWith(1);
    expect(component.dataSource.data).toEqual([component.refreshTokens![1]]);
  }));

});
