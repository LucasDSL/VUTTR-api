import { Tag } from '../tags/tag.entity';
import { Tool } from '../tools/tool.entity';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ToolTags {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Tool, (tool) => tool.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  tool: Tool;

  @ManyToOne(() => Tag, (tag) => tag.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  tag: Tag;
}
