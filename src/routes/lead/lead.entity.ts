import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'leads' })
export class LeadEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
