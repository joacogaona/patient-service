import { Test } from '@nestjs/testing';

import { PatientsService } from './patients.service';
import { Repository } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotificationService } from '../notifications/entities/notification.service';
import { EmailService } from '../emails/email.service';

describe('PatientService', () => {
  let patientSevice: PatientsService;
  let notificationService: NotificationService;
  let repo: Repository<Patient>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        PatientsService,
        {
          provide: getRepositoryToken(Patient),
          useClass: Repository,
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
          },
        },
        {
          provide: EmailService,
          useValue: {
            sendEmail: jest.fn(),
          },
        },
        {
          provide: NotificationService,
          useValue: {
            sendNotification: jest.fn(),
          },
        },
      ],
    }).compile();

    patientSevice = moduleRef.get<PatientsService>(PatientsService);
    notificationService =
      moduleRef.get<NotificationService>(NotificationService);
    repo = moduleRef.get<Repository<Patient>>(getRepositoryToken(Patient));
  });

  describe('create', () => {
    it('should save a patient and send a notification', async () => {
      const mockPatient = new Patient();
      const createPatientDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        countryCode: 'US',
        phoneNumber: '1234567890',
        documentUrl: 'https://example.com/document.jpg',
      };

      jest.spyOn(repo, 'save').mockResolvedValueOnce(mockPatient);
      jest
        .spyOn(notificationService, 'sendNotification')
        .mockResolvedValueOnce(undefined);
      const result = await patientSevice.create(createPatientDto);
      expect(result).toEqual(mockPatient);
      expect(repo.save).toHaveBeenCalledWith(createPatientDto);
      expect(notificationService.sendNotification).toHaveBeenCalledWith(
        mockPatient.id,
        'email',
        mockPatient.email,
      );
    });
  });

  describe('findAll', () => {
    it('should retrieve all patients', async () => {
      const mockPatients = [new Patient(), new Patient()];
      jest.spyOn(repo, 'find').mockResolvedValueOnce(mockPatients);

      const result = await patientSevice.findAll();

      expect(result).toEqual(mockPatients);
      expect(repo.find).toHaveBeenCalled();
    });
  });
});
