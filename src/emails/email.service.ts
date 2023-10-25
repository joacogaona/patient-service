import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Queue } from 'bull';
import { SendMailOptions } from 'nodemailer';
import { Notification } from '../notifications/entities/notification.entity';

@Injectable()
export class EmailService {
  constructor(
    @InjectQueue('email') private readonly emailQueue: Queue,
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,
  ) {}

  async sendEmail(patientId: number, options: SendMailOptions) {
    try {
      const notification = new Notification();
      notification.recipientEmail = options.to as string;
      notification.subject = options.subject;
      notification.status = 'queued';
      notification.patient = { id: patientId } as any;

      const newNotification =
        await this.notificationRepository.save(notification);

      const job = await this.emailQueue.add('send', {
        ...options,
        notificationId: newNotification.id,
      });

      return job;
    } catch (error) {
      console.error('Failed to queue email:', error);
      throw error;
    }
  }
}
