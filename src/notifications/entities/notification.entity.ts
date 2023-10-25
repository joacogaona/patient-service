import { NotificationChannel } from 'src/notification-channels/entities/notification-channel.entity';
import { Patient } from 'src/patients/entities/patient.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Notification {
  @Column({ primary: true, generated: true })
  id: number;

  @Column()
  recipientEmail: string;

  @Column()
  subject: string;

  @Column({ default: 'pending' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Patient, (patient) => patient.id)
  patient: Patient;

  @ManyToOne(() => NotificationChannel)
  channel: NotificationChannel;
}
