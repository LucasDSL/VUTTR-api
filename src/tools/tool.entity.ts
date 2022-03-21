import { User } from '../user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Tool {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'sentBy' })
  user: User;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('varchar', { length: 350 })
  link: string;

  @CreateDateColumn()
  createdAt: string;
}
