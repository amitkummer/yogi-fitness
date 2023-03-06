import { Component } from '@angular/core';
import { Workout } from '../homepage/homepage.component';
import { validateWorkoutData } from '../homepage/homepage.component';

@Component({
  selector: 'app-statisticspage',
  templateUrl: './statisticspage.component.html',
  styleUrls: ['./statisticspage.component.scss']
})
export class StatisticspageComponent {
  // Internal variable for raw workouts data from the backend.
  workouts: Workout[] = []
  // Total workout duration time for each month from past year.
  durationAveragePastYear: number[] = [];
  // Average intensity for each month from past year.
  intensityAveragePastYear: number[] = [];
  // Average ammount of calories burned in each month from past year.
  caloriesBurnedAveragePastYear: number[] = [];

  durationAverageAllTime: number[] = [];
  intensityAverageAllTime: number[] = [];
  caloriesBurnedAverageAllTime: number[] = [];

  years: string[] = []
  caloriesBurnedPerYear: number[] = []

  async ngOnInit() {
    await this.fetchWorkouts()
    const lastYearWorkouts  = this.workouts.filter((workout: Workout) => {
      const nowLastYear = new Date(Date.now())
      nowLastYear.setFullYear(nowLastYear.getFullYear() - 1)
      return workout.startDateTime > nowLastYear
    })
    this.durationAverageAllTime = this.getDurationPerMonth(this.workouts)
    this.intensityAverageAllTime = this.getIntensityPerMonth(this.workouts)
    this.caloriesBurnedAverageAllTime = this.getCaloriesBurnedPerMonth(this.workouts)

    this.durationAveragePastYear = this.getDurationPerMonth(lastYearWorkouts)
    this.intensityAveragePastYear = this.getIntensityPerMonth(lastYearWorkouts)
    this.caloriesBurnedAveragePastYear = this.getCaloriesBurnedPerMonth(lastYearWorkouts)

    this.years = this.getYears(this.workouts)
    this.caloriesBurnedPerYear = this.getCaloriesBurnedPerYear(this.workouts, this.years)
  }

  private getCaloriesBurnedPerYear(workouts: Workout[], years_: string[]): number[] {
    const years = years_.map(year => parseInt(year))
    const caloriesBurned = Array(years.length).fill(0)
    years.forEach((year: number, index: number) => {
      const caloriesFromYear = workouts
        .filter((workout: Workout) => workout.startDateTime.getFullYear() == year)
        .map((workout: Workout) => workout.caloriesBurned)
        .reduce((accumulator, currentValue) => accumulator + currentValue)
      caloriesBurned[index] = caloriesFromYear
    })
    return caloriesBurned
  }

  private getYears(workouts: Workout[]): string[] {
    const years = workouts.map((workout: Workout) => workout.startDateTime.getFullYear())
    const uniqueYears = new Set(years)
    const uniqyeYearsArray = Array.from(uniqueYears)
    return uniqyeYearsArray.map(year => year.toString())
  }

  private getCaloriesBurnedPerMonth(workouts: Workout[]): number[] {
    const totalCaloriesPerMonth = Array(12).fill(0)
    workouts.forEach((workout: Workout) => {
      totalCaloriesPerMonth[workout.startDateTime.getMonth()] += workout.caloriesBurned
    })
    const averageCaloriesPerMonth = totalCaloriesPerMonth.map((totalCalories: number, index: number) => {
      const count = this.workoutCountInMonth(index, workouts)
      if (count == 0) {
        return 0
      }
      return totalCalories / count
    })
    return averageCaloriesPerMonth
  }

  private getIntensityPerMonth(workouts: Workout[]): number[] {
    const totalIntensityPerMonth = Array(12).fill(0)
    workouts.forEach((workout: Workout) => {
      totalIntensityPerMonth[workout.startDateTime.getMonth()] += workout.intensity
    })
    const averageIntensityPerMonth = totalIntensityPerMonth.map((totalIntensity: number, index: number) => {
      const count = this.workoutCountInMonth(index, workouts)
      if (count == 0) {
        return 0
      }
      return totalIntensity / count
    })
    return averageIntensityPerMonth
  }

  private getDurationPerMonth(workouts: Workout[]): number[] {
    const totalDurationPerMonth = Array(12).fill(0)
    workouts.forEach((workout: Workout) => {
      const workoutDurationMinutes = this.durationFrom(workout["startDateTime"], workout["endDateTime"])
      totalDurationPerMonth[workout.startDateTime.getMonth()] += workoutDurationMinutes
    })
    const averageDuratioPerMonth = totalDurationPerMonth.map((totalDuration: number, index: number) => {
      const count = this.workoutCountInMonth(index, workouts)
      if (count == 0) {
        return 0
      }
      return totalDuration / count
    })
    return averageDuratioPerMonth
  }

  private workoutCountInMonth(month: number, workouts: Workout[]) {
    // January == 0, December == 11.
    let count = 0
    workouts.forEach((workout: Workout) => {
      if (workout.startDateTime.getMonth() == month) {
        count++
      }
    })
    return count
  }

  private durationFrom(startDate: any, endDate: any) {
    return (endDate - startDate) / 60000;
  }

  async fetchWorkouts(): Promise<void> {
    const req = new Request('http://localhost:3000/api/workouts');
    const response = await fetch(req);
    if (!response.ok) {
      throw new Error(`Http error. Status: ${response.status}`);
    }
    const workouts = await response.json();
    try {
      validateWorkoutData(workouts);
    } catch (error) {
      console.error('Error while validating backend data:\n' + error);
    }
    workouts.forEach((workout: any) => {
      workout['startDateTime'] = new Date(workout['startDateTime']);
      workout['endDateTime'] = new Date(workout['endDateTime']);
    });
    this.workouts = workouts;
  }
}
