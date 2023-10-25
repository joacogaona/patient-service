import { Column, Entity } from 'typeorm';

@Entity()
export class NotificationChannel {
  @Column({ primary: true, generated: true })
  id: number;

  @Column()
  name: string;
}
