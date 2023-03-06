import { Component, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Workout } from '../homepage/homepage.component';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: [ './line-chart.component.scss' ]
})
export class LineChartComponent {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  // Internal variable for raw workouts data from the backend.
  _workouts: Workout[] = []
  // Total workout duration time for each month.
  _duration: number[] = [];
  // Average intensity for each month.
  _intensity: number[] = [];
  // Average ammount of calories burned in each month.
  _caloriesBurned: number[] = [];

  @Input()
  get duration(): number[] { return this._duration }
  set duration(duration: number[]) {
    this._duration = duration;
    this.lineChartData.datasets[0].data = this._duration
    this.chart?.update();
  }

  @Input()
  get intensity(): number[] { return this._intensity }
  set intensity(intensity: number[]) {
    this._intensity = intensity;
    this.lineChartData.datasets[1].data = this._intensity
    this.chart?.update();
  }

  @Input()
  get caloriesBurned(): number[] { return this._caloriesBurned }
  set caloriesBurned(caloriesBurned: number[]) {
    this._caloriesBurned = caloriesBurned;
    this.lineChartData.datasets[2].data = this._caloriesBurned
    this.chart?.update();
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Average Duration (Minutes)',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: [ 28, 48, 40, 19, 86, 27, 90 ],
        label: 'Average Intensity',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      },
      {
        data: [],
        yAxisID: 'y1',
        label: 'Average Calories Burned',
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ]
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    plugins: {
      title: {
        text: "Average Workout Statistics Per Month (Last 12 Months)",
        display: true
      }
    }
  };

  public lineChartType: ChartType = 'line';
}