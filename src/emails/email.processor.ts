import {
  Processor,
  Process,
  OnQueueCompleted,
  OnQueueFailed,
} from '@nestjs/bull';
import { Job } from 'bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SendMailOptions, Transporter } from 'nodemailer';
import { Notification } from '../notifications/entities/notification.entity';
import { Inject } from '@nestjs/common';

interface ExtendedMailOptions extends SendMailOptions {
  notificationId: number;
}

@Processor('email')
export class EmailProcessor {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>,

    @Inject('MAIL_TRANSPORTER')
    private readonly mailTransporter: Transporter,
  ) {}

  @Process('send')
  async sendEmail(job: Job<ExtendedMailOptions>) {
    const { data } = job;
    await this.mailTransporter.sendMail(data);
  }

  @OnQueueCompleted()
  async onCompleted(job: Job<ExtendedMailOptions>) {
    const notification = await this.notificationRepository.findOne({
      where: { id: job.data.notificationId },
    });
    if (notification) {
      notification.status = 'sent';
      notification.updatedAt = new Date();
      await this.notificationRepository.save(notification);
    }
  }

  @OnQueueFailed()
  async onFailed(job: Job<ExtendedMailOptions>) {
    const notification = await this.notificationRepository.findOne({
      where: { id: job.data.notificationId },
    });
    if (notification) {
      notification.status = 'failed';
      notification.updatedAt = new Date();
      await this.notificationRepository.save(notification);
    }
  }
}
