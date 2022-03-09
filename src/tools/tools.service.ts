import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/tags/tag.entity';
import { TagsService } from 'src/tags/tags.service';
import { ToolTagsService } from 'src/tool-tags/tool-tags.service';
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
    private readonly toolTagsService: ToolTagsService,
  ) {}

  async createTool(createToolDto: CreateToolDto, user: any) {
    const userFound = await this.userService.findOneById(user.userId);
    if (!userFound) {
      throw new BadRequestException('User not found!');
    }

    const toolModel = this.ToolsRepository.create({
      user: userFound,
      ...createToolDto,
    });
    const createdTool = await this.ToolsRepository.save(toolModel);

    const tags = createToolDto.tags;
    await this.validateTags(tags);
    tags.forEach(async (tag) => {
      await this.toolTagsService.createRelation(
        createdTool,
        await this.tagsService.findByName(tag),
      );
    });
  }

  async validateTags(tagNames: string[]) {
    tagNames.forEach(async (name) => {
      const isThereTag = await this.tagsService.findByName(name);
      if (!isThereTag) {
        const newTag = this.tagsService.create(name);
        await this.tagsService.save(newTag);
      }
    });
  }

  async allTools(page: number | undefined) {
    const tools = await this.getTools(page);
    const promisesFormatedTools = tools.map(async (tool) => {
      const tags = await this.findTagsByTool(tool);
      console.log({ ...tool, tags: tags });
      return { ...tool, tags: tags };
    });

    return Promise.all(promisesFormatedTools);
  }

  async getTools(page = 1) {
    const tools = await this.ToolsRepository.find({
      skip: (page - 1) * 10,
      take: 10,
    });
    return tools;
  }

  async findTagsByTool(tool: Tool) {
    const relations = await this.toolTagsService.findByTool(tool);
    return relations.map((rel) => rel.tag.name);
  }
}
