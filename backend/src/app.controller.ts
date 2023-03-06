import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Res,
  Param,
  Put,
} from '@nestjs/common';
import { FirestoreService, Workout } from './firestore.service';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

@Controller('api/workouts')
export class AppController {
  constructor(private readonly firestoreService: FirestoreService) {}

  validateWorkoutData(workout: Workout) {
    const schema = {
      type: 'object',
      properties: {
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
    };
    const ajv = new Ajv();
    addFormats(ajv, ['date-time', 'uri', 'duration']);
    const validate = ajv.compile(schema);
    const valid = validate(workout);
    if (!valid) {
      console.log(validate.errors);
      throw validate.errors;
    }
  }

  @Get()
  list() {
    return this.firestoreService.getWorkoutsList();
  }

  @Get(':id')
  async item(@Param('id') id: string, @Res() response) {
    const workout = await this.firestoreService.getWorkout(id);
    if (!workout) {
      response.send(404, `Document with id ${id} not found.`);
    }
    return response.send(200, workout);
  }

  @Post()
  async create(@Body() workout: Workout, @Res() response) {
    try {
      this.validateWorkoutData(workout);
    } catch (error) {
      return response.send(404, error.message);
    }
    const workoutId = await this.firestoreService.createWorkout(workout);
    return response.send(201, { id: workoutId });
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() response) {
    try {
      await this.firestoreService.deleteWorkout(id);
      response.send(204);
    } catch (error) {
      response.send(404, error.message);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() workout: Workout,
    @Res() response,
  ) {
    try {
      this.validateWorkoutData(workout);
    } catch (error) {
      console.error(error);
      return response.send(404, error.message);
    }
    const workoutId = await this.firestoreService.updateWorkout(id, workout);
    return response.send(201, { id: workoutId });
  }
}
