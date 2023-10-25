import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';
import { EmailService } from '../emails/email.service';
import { NotificationService } from 'src/notifications/entities/notification.service';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly PatientRepository: Repository<Patient>,
    private readonly emailService: EmailService,
    private readonly notificationService: NotificationService,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    const savedPatient = await this.PatientRepository.save(createPatientDto);
    this.notificationService.sendNotification(
      savedPatient.id,
      'email',
      savedPatient.email,
    );
    return savedPatient;
  }

  async findAll() {
    return await this.PatientRepository.find();
  }

  async remove(id: number) {
    return await this.PatientRepository.softDelete({ id });
  }
}
