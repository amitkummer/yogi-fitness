import { Injectable } from '@nestjs/common';

import * as admin from 'firebase-admin';

export interface Workout {
  title: string;
  subtitle: string;
  description: string;
  date: string;
}

@Injectable()
export class FirestoreService {
  async getWorkoutsList() {
    const firestore = admin.firestore();
    const query = await firestore.collectionGroup('workouts').get();
    const documents = query.docs;
    return await Promise.all(
      documents.map(async (snapshot) => {
        return { id: snapshot.id, ...snapshot.data() };
      }),
    );
  }

  async getWorkout(id: string) {
    const firestore = admin.firestore();
    const documentRef = firestore.collection('workouts').doc(id);
    const doc = await documentRef.get();
    return doc.data();
  }

  async createWorkout(workout: Workout) {
    const firestore = admin.firestore();
    const collection = firestore.collection('workouts');
    const document = await collection.add(workout);
    return document.id;
  }

  async deleteWorkout(id: string) {
    const firestore = admin.firestore();
    const collection = firestore.collection('workouts');
    const documentRef = collection.doc(id);
    await documentRef.delete({ exists: true });
  }

  async updateWorkout(id: string, workout: Workout) {
    const firestore = admin.firestore();
    const collection = firestore.collection('workouts');
    const documentRef = collection.doc(id);
    await documentRef.set(workout);
  }
}
