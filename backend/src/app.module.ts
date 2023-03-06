import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FirestoreService } from './firestore.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [FirestoreService],
})
export class AppModule {}
