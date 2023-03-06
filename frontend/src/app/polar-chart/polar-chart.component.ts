import { Component, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import colorLib from '@kurkle/color';

@Component({
  selector: 'app-polar-chart',
  templateUrl: './polar-chart.component.html',
  styleUrls: ['./polar-chart.component.scss']
})
export class PolarChartComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  @Input()
  set labels(yearLabels: string[]) {
    this.data.labels = yearLabels;
    this.chart?.update();
  }
  @Input()
  set chartData(caloriesBurnedPeryYear: number[]) {
    this.data.datasets[0].data = caloriesBurnedPeryYear;
    this.chart?.update();
  }

  chart_colors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
  };

  transparentize(value: string, opacity: number) {
    let alpha = 1 - opacity;
    return colorLib(value).alpha(alpha).rgbString();
  }

  public data: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Calories Burned',
        backgroundColor: [
          this.transparentize(this.chart_colors.red, 0.5),
          this.transparentize(this.chart_colors.orange, 0.5),
          this.transparentize(this.chart_colors.yellow, 0.5),
          this.transparentize(this.chart_colors.green, 0.5),
          this.transparentize(this.chart_colors.blue, 0.5),
        ]
      },
    ],
    labels: []
  };

  public options: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    plugins: {
      title: {
        text: "Calories Burned Per Year",
        display: true
      }
    }
  };

  public type: ChartType = 'polarArea';
}
