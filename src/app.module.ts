import { Module } from '@nestjs/common';
import { PatientsModule } from './patients/patients.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { NotificationsModule } from './notifications/notifications.module';
// import { NotificationChannelsModule } from './notification-channels/notification-channels.module';
import { BullModule } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'user_challenge',
      password: 'root',
      database: 'db_challenge',
      autoLoadEntities: true,
      synchronize: true,
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: {
          user: 'juakoog97@gmail.com',
          pass: 'j.u.a.k.o1',
        },
      },
    }),
    PatientsModule,
    // NotificationsModule,
    // NotificationChannelsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
