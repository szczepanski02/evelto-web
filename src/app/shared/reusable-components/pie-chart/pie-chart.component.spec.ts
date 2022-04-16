import { PieChartComponent } from './pie-chart.component';
import { SharedTranslateModule } from './../../../shared/shared-translate.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PieChartComponent', () => {
  let component: PieChartComponent;
  let fixture: ComponentFixture<PieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedTranslateModule],
      declarations: [PieChartComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PieChartComponent);
    component = fixture.componentInstance;
    component.data = [{
      label: 'Fr',
      value: 63,
      toDay: 2,
      color: '#36A2EB',
    }, {
      label: 'Sec',
      value: 121,
      toDay: 12,
      color: '#3269AB',
    }]
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data into chart', () => {

    // WHEN
    component.ngOnInit();

    // THEN
    expect(component.pieChartData.labels).toEqual(['Fr', 'Sec']);
    expect(component.pieChartData.datasets[0].data).toEqual([63, 121]);
    expect(component.pieChartData.datasets[0].backgroundColor).toEqual(['#36A2EB', '#3269AB']);
  });

});
