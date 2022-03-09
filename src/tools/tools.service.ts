import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/tags/tag.entity';
import { TagsService } from 'src/tags/tags.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { CreateToolDto } from './dto/create-tool.dto';
import { Tool } from './tool.entity';

@Injectable()
export class ToolsService {
  constructor(
    @InjectRepository(Tool) private ToolsRepository: Repository<Tool>,
    private readonly userService: UserService,
    private readonly tagsService: TagsService,
  ) {}

  async createTool(createToolDto: CreateToolDto, user: any) {
    const userFound = await this.userService.findOneById(user.userId);
    if (!userFound) {
      throw new BadRequestException('User not found!');
    }
    const tags = createToolDto.tags;
    const tagsEntities: Tag[] = [];
    this.validateTags(tags);
    tags.forEach(async (tag) => {
      const nowTag = await this.tagsService.findByName(tag);
      tagsEntities.push(nowTag);
    });

    const toolModel = this.ToolsRepository.create({
      user: userFound,
      ...createToolDto,
      tags: tagsEntities,
    });
    await this.ToolsRepository.save(toolModel);
  }

  validateTags(tagNames: string[]) {
    tagNames.forEach(async (name) => {
      const isThereTag = this.tagsService.findByName(name);
      if (!isThereTag) {
        const newTag = this.tagsService.create(name);
        await this.tagsService.save(newTag);
      }
    });
  }
  getTools() {
    return this.ToolsRepository.find({ relations: ['tags'] });
  }
}
