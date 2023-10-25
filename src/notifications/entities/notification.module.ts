import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { EmailsModule } from 'src/emails/email.module';
import { NotificationChannel } from 'src/notification-channels/entities/notification-channel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [EmailsModule, TypeOrmModule.forFeature([NotificationChannel])],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
