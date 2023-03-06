import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { Workout, validateWorkoutData } from '../homepage/homepage.component';

@Component({
  selector: 'app-editpage',
  templateUrl: './editpage.component.html',
  styleUrls: ['./editpage.component.scss'],
})
export class EditpageComponent implements OnInit {
  constructor(public router_: Router) {
    this.router = router_;
    this.id = router_.url.split('/').pop() as string;
    this.title = new FormControl(this.workout.title, Validators.required);
    this.description = new FormControl(
      this.workout.description,
      Validators.required
    );
    this.duration = new FormControl(1, [
      Validators.required,
      Validators.min(1),
    ]);
    this.caloriesBurned = new FormControl(1, [
      Validators.required,
      Validators.min(1),
    ]);
  }

  update: Boolean = false;
  router: Router;
  id: string;
  intensityValues: number[] = [1, 2, 3, 4, 5, 6];
  title: FormControl;
  description: FormControl;
  duration: FormControl;
  caloriesBurned: FormControl;
  workout: Workout = {
    id: '',
    title: '',
    subtitle: '',
    description: '',
    startDateTime: new Date(),
    imageSource: '',
    endDateTime: new Date(),
    intensity: 1,
    caloriesBurned: 0,
  };

  async ngOnInit() {
    await this.fetchWorkout();
    this.duration.setValue(
      this.durationFrom(
        this.workout['startDateTime'],
        this.workout['endDateTime']
      )
    );
    this.title.setValue(this.workout.title);
    this.description.setValue(this.workout.description);
    this.caloriesBurned.setValue(this.workout.caloriesBurned);
  }

  getErrorMessage(formControl: FormControl) {
    if (formControl.hasError('required')) {
      return 'You must enter a value';
    }
    if (formControl.hasError('min')) {
      return 'Duration must be a positive number';
    }
    return 'Form error';
  }

  async sendForm() {
    this.update = true;
    const workout = {
      title: this.title.value,
      subtitle: this.workout.subtitle,
      description: this.description.value,
      startDateTime: this.workout.startDateTime,
      imageSource: this.workout.imageSource,
      endDateTime: new Date(
        this.workout.startDateTime.getTime() + this.duration.value * 60000
      ),
      intensity: this.workout.intensity,
      caloriesBurned: parseInt(this.caloriesBurned.value),
    };
    console.log(JSON.stringify(workout));
    const req = new Request(`http://localhost:3000/api/workouts/${this.id}`);
    const response = await fetch(req, {
      body: JSON.stringify(workout),
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      console.error(`Http error. Body: ${response.body}`);
      return;
    }
    this.router.navigate(['/']);
  }

  async fetchWorkout() {
    const req = new Request(`http://localhost:3000/api/workouts/${this.id}`);
    const response = await fetch(req);
    if (!response.ok) {
      throw new Error(`Http error. Status: ${response.status}`);
    }
    const workout = await response.json();
    try {
      validateWorkoutData([workout]);
    } catch (error) {
      console.error('Error while validating backend data:\n' + error);
    }
    workout['startDateTime'] = new Date(workout['startDateTime']);
    workout['endDateTime'] = new Date(workout['endDateTime']);
    this.workout = workout;
    console.log(this.workout);
  }

  durationFrom(startDate: any, endDate: any) {
    console.log(endDate);
    return (endDate - startDate) / 60000;
  }
}
