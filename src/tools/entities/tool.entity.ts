import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  CreateDateColumn,
} from 'typeorm';
import { Tag } from './tag.entity';

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

  @Column('string')
  name: string;

  @Column('text')
  description: string;

  @Column('varchar', { length: 350 })
  link: string;

  @ManyToMany(() => Tag)
  @JoinColumn()
  tags: Tag[];

  @CreateDateColumn()
  createdAt: string;
}
