import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

export interface Workout {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  startDateTime: Date;
  imageSource: string;
  endDateTime: Date;
  intensity: number;
  caloriesBurned: number;
}

export function validateWorkoutData(workout: Workout[]) {
  const schema = {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        subtitle: { type: 'string' },
        description: { type: 'string' },
        startDateTime: { type: 'string', format: 'date-time' },
        imageSource: { type: 'string', format: 'uri' },
        endDateTime: { type: 'string', format: 'date-time' },
        intensity: { type: 'number', maximum: 10, minimum: 1 },
        caloriesBurned: { type: 'number', minimum: 1 },
      },
      required: [
        'title',
        'subtitle',
        'description',
        'startDateTime',
        'imageSource',
        'endDateTime',
        'intensity',
        'caloriesBurned',
      ],
      additionalProperties: false,
    },
    uniqueItems: true,
  };
  const ajv = new Ajv();
  addFormats(ajv, ['date-time', 'uri', 'duration']);
  const validate = ajv.compile(schema);
  const valid = validate(workout);
  if (!valid) {
    throw validate.errors;
  }
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  workouts: Workout[] = [];

  duration(startDate: any, endDate: any) {
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
    this.workouts.sort((a: any, b: any) => {
      return b.startDateTime - a.startDateTime
    })
    console.log(this.workouts);
  }

  openDeleteDialog(workoutName: string, workoutId: string) {
    console.log(this.dialog);
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { name: workoutName, id: workoutId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.fetchWorkouts();
    });
  }

  async ngOnInit() {
    await this.fetchWorkouts();
  }
}
