import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Notification } from '../notifications/entities/notification.entity';
import { EmailsModule } from '../emails/email.module';
import { NotificationModule } from '../notifications/entities/notification.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient, Notification]),
    EmailsModule,
    NotificationModule,
  ],
  controllers: [PatientsController],
  providers: [PatientsService],
})
export class PatientsModule {}
