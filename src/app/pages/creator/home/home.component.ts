import { IAuthorizatedUser } from 'src/app/shared/interfaces/AuthorizatedUser';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { IPieChartData } from 'src/app/shared/reusable-components/pie-chart/pie-chart.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  client: IAuthorizatedUser | null = null;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  constructor(readonly authService: AuthService) {}

  ngOnInit(): void {
    this.client = this.authService.getAuthorizatedUser();
  }

  ngOnDestroy(): void {}

  pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
    },
  };

  pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Views', 'Subscribes', 'Likes'],
    datasets: [
      {
        data: [1600, 500, 100],
        backgroundColor: ['#038aff', '#1dd1a1', '#f6b93b'],
        hoverBackgroundColor: ['#038aff', '#1dd1a1', '#f6b93b'],
        borderWidth: 0,
        hoverOffset: -2,
      },
    ],
  };

  pieChartType: ChartType = 'doughnut';

  pieData: IPieChartData[] = [
    {
      label: 'Views',
      value: 1600,
      toDay: 754,
      color: '#038aff',
    },
    {
      label: 'Subscribes',
      value: 500,
      toDay: 121,
      color: '#1dd1a1',
    },
    {
      label: 'Likes',
      value: 100,
      toDay: 52,
      color: '#f6b93b',
    },
  ];
}
