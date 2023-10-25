import { Notification } from 'src/notifications/entities/notification.entity';
import { Entity, Column, DeleteDateColumn, OneToMany } from 'typeorm';

@Entity()
export class Patient {
  //   @PrimaryGeneratedColumn()
  @Column({ primary: true, generated: true })
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  countryCode: string;

  @Column()
  phoneNumber: string;

  @Column()
  documentUrl: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => Notification, (notification) => notification.patient)
  notifications: Notification[];
}
