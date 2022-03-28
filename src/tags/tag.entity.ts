import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  name: string;

  constructor(tag: Partial<Tag>) {
    this.name = tag?.name;
    this.id = tag?.id;
  }
}
