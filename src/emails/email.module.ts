import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from '../notifications/entities/notification.entity';
import { EmailProcessor } from './email.processor';
import { createTransport } from 'nodemailer';
import { ConfigService } from '@nestjs/config';

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
      useFactory: (configService: ConfigService) =>
        createTransport({
          host: configService.get<string>('NODEMAILER_HOST'),
          port: configService.get<number>('NODEMAILER_PORT'),
          auth: {
            user: configService.get<string>('NODEMAILER_USER'),
            pass: configService.get<string>('NODEMAILER_PASS'),
          },
        }),
      inject: [ConfigService],
    },
  ],
  exports: [EmailService],
})
export class EmailsModule {}
