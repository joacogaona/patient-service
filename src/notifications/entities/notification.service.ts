import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from '../../emails/email.service';
import { NotificationChannel } from '../../notification-channels/entities/notification-channel.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificationService {
  constructor(
    private readonly emailService: EmailService,
    @InjectRepository(NotificationChannel)
    private readonly channelRepository: Repository<NotificationChannel>,
  ) {
    this.initializeChannels();
  }

  private async initializeChannels() {
    // Check if data exists first to prevent duplicates
    const existingEmailChannel = await this.channelRepository.findOne({
      where: { name: 'email' },
    });
    if (!existingEmailChannel) {
      await this.channelRepository.save({
        name: 'email',
      });
    }

    const existingSmsChannel = await this.channelRepository.findOne({
      where: { name: 'sms' },
    });
    if (!existingSmsChannel) {
      await this.channelRepository.save({
        name: 'sms',
      });
    }
  }

  async sendNotification(
    patientId: number,
    channelName: string,
    patientEmail: string,
  ) {
    const channel = await this.channelRepository.findOne({
      where: { name: channelName },
    });

    if (!channel) {
      throw new Error('Invalid notification channel.');
    }

    switch (channel.name) {
      case 'email':
        this.emailService.sendEmail(patientId, {
          from: 'juakoog97@gmail.com',
          to: patientEmail,
          subject: 'Patient Registration Successful',
          text: 'Your registration was successful!',
        });
        break;
      case 'sms':
        break;
      default:
        throw new Error(`Unsupported notification channel: ${channel.name}`);
    }
  }
}
