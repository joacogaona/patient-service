import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from '../notifications/entities/notification.entity';
import { EmailProcessor } from './email.processor';
import { createTransport } from 'nodemailer';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notification]),
    BullModule.registerQueue({
      name: 'email',
    }),
  ],
  providers: [
    EmailService,
    EmailProcessor,
    {
      provide: 'MAIL_TRANSPORTER',
      useValue: createTransport({
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: 'eabe5b9c31c2d0',
          pass: 'fe64163c934a5d',
        },
      }),
    },
  ],
  exports: [EmailService],
})
export class EmailsModule {}
