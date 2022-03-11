import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/tags/tag.entity';
import { Tool } from 'src/tools/tool.entity';
import { Repository } from 'typeorm';
import { ToolTags } from './toolTags.entity';

@Injectable()
export class ToolTagsService {
  constructor(
    @InjectRepository(ToolTags)
    private readonly ToolsTagsRepository: Repository<ToolTags>,
  ) {}

  findByTool(tool: Tool): Promise<ToolTags[]> {
    return this.ToolsTagsRepository.find({
      where: { tool },
      relations: ['tag'],
    });
  }

  findByTag(tag: Tag): Promise<ToolTags[]> {
    return this.ToolsTagsRepository.find({
      where: { tag },
      relations: ['tool'],
    });
  }

  async createRelation(tool: Tool, tag: Tag) {
    const relation = this.ToolsTagsRepository.create({ tool, tag });
    await this.ToolsTagsRepository.save(relation);
  }
}
