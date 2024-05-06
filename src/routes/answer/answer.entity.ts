import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'answers' })
export class AnswerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column('simple-array')
  answers: string[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
