import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from './entities/patient.entity';
import { Repository } from 'typeorm';
import { EmailService } from '../emails/email.service';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private readonly PatientRepository: Repository<Patient>,
    private readonly emailService: EmailService,
  ) {}

  async create(createPatientDto: CreatePatientDto) {
    const savedPatient = await this.PatientRepository.save(createPatientDto);
    this.emailService.sendEmail(savedPatient.id, {
      from: 'juakoog97@gmail.com',
      to: savedPatient.email,
      subject: 'Patient Registration Successful',
      text: 'Your registration was successful!',
    });
    return savedPatient;
  }

  async findAll() {
    return await this.PatientRepository.find();
  }

  async remove(id: number) {
    return await this.PatientRepository.softDelete({ id });
  }
}
