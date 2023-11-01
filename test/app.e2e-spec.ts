import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { CreatePatientDto } from '../src/patients/dto/create-patient.dto';
import { NotificationService } from '../src/notifications/entities/notification.service';

describe('Patients (e2e)', () => {
  let app: INestApplication;
  let notificationService: NotificationService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    notificationService =
      moduleFixture.get<NotificationService>(NotificationService);
    await app.init();
  });

  it('/patients (POST)', () => {
    const createPatientDto: CreatePatientDto = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      countryCode: 'US',
      phoneNumber: '1234567890',
      documentUrl: 'http://example.com/document.pdf',
    };

    jest
      .spyOn(notificationService, 'sendNotification')
      .mockImplementation(async () => {});

    return request(app.getHttpServer())
      .post('/patients')
      .send(createPatientDto)
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.firstName).toEqual('John');
        expect(notificationService.sendNotification).toHaveBeenCalledWith(
          res.body.id,
          'email',
          'john.doe@example.com',
        );
      });
  });

  it('/patients (GET)', () => {
    return request(app.getHttpServer())
      .get('/patients')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
      });
  });
});
