import { ElementRef } from '@angular/core';
import {
  Component,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit, AfterViewInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  pieChartType: ChartType = 'doughnut';

  @Input() data?: IPieChartData[];
  @Input() title?: string;

  // dom elements
  @ViewChild('pieEl') pieEl?: ElementRef;
  @ViewChild('labelsEl') labelsEl?: ElementRef;

  // chart initialization
  pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Views', 'Subscribes', 'Likes'],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: [],
        borderWidth: 0,
        hoverOffset: -2,
      },
    ],
  };

  constructor() {}

  ngOnInit(): void {
    this.chartDataInit();
  }

  ngAfterViewInit(): void {
    if (!this.data) {
      this.pieEl!.nativeElement.style.display = 'none';
    }
  }

  chartDataInit(): void {
    let labels: string[] = [];
    let values: number[] = [];
    let colors: string[] = [];
    this.data!.forEach((item) => {
      labels.push(item.label);
      values.push(item.value);
      colors.push(item.color);
    });
    this.pieChartData.labels = labels;
    this.pieChartData.datasets[0].data = values;
    this.pieChartData.datasets[0].backgroundColor = colors;
    this.pieChartData.datasets[0].hoverBackgroundColor = colors;
  }

  pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };
}

export interface IPieChartData {
  label: string;
  value: number;
  toDay: number;
  color: string;
}
