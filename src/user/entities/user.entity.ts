import { Tool } from 'src/tools/entities/tool.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  UpdateDateColumn,
} from 'typeorm';
import { hashSync } from 'bcrypt';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('string', { length: 12, unique: true, nullable: false })
  username: string;

  @Column('string', { unique: true, nullable: false })
  email: string;

  @Column('string')
  password: string;

  @OneToMany(() => Tool, (tool) => tool.user)
  tools: Tool[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  lastLogin: Date;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.password) {
      this.password = hashSync(this.password, 8);
    }
  }
}
