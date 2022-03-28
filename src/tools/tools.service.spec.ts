import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Tag } from '../tags/tag.entity';
import { TagsService } from '../tags/tags.service';
import { ToolTagsService } from '../tool-tags/tool-tags.service';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Repository } from 'typeorm';
import { Tool } from './tool.entity';
import { ToolsService } from './tools.service';
import { CreateToolDto } from './dto/create-tool.dto';

describe('ToolsService', () => {
  let toolsService: ToolsService;
  let toolsRepository: Repository<Tool>;
  let userService: UserService;
  let tagsService: TagsService;
  let toolTagsService: ToolTagsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ToolsService,
        {
          provide: getRepositoryToken(Tool),
          useValue: {
            create: jest.fn().mockResolvedValue(new Tool()),
            save: jest.fn().mockResolvedValue(new Tool()),
            find: jest.fn().mockResolvedValue([new Tool()]),
          },
        },
        {
          provide: UserService,
          useValue: {
            findOneById: jest.fn().mockResolvedValue(new User()),
          },
        },
        {
          provide: ToolTagsService,
          useValue: {
            createRelation: jest.fn(),
            findByTool: jest
              .fn()
              .mockResolvedValue([new Tag({ name: 'tag', id: '111' })]),
          },
        },
        {
          provide: TagsService,
          useValue: {
            findByName: jest
              .fn()
              .mockResolvedValue(new Tag({ name: 'tag', id: '111' })),
            create: jest
              .fn()
              .mockResolvedValue(new Tag({ name: 'tag', id: '111' })),
            save: jest
              .fn()
              .mockResolvedValue(new Tag({ name: 'tag', id: '111' })),
          },
        },
      ],
    }).compile();

    toolsService = module.get<ToolsService>(ToolsService);
    toolsRepository = module.get<Repository<Tool>>(getRepositoryToken(Tool));
    tagsService = module.get<TagsService>(TagsService);
    userService = module.get<UserService>(UserService);
    toolTagsService = module.get<ToolTagsService>(ToolTagsService);
  });

  it('should be defined along its dependencies', () => {
    expect(toolsService).toBeDefined();
    expect(toolsRepository).toBeDefined();
    expect(tagsService).toBeDefined();
    expect(userService).toBeDefined();
    expect(toolTagsService).toBeDefined();
  });

  const bodyForCreatingTool: CreateToolDto = {
    name: 'fakeTool',
    description: 'fake description',
    link: 'www',
    tags: ['tag', 'tag'],
  };
  describe('createTool', () => {
    it('should create the user and return nothing', async () => {
      // Act
      await toolsService.createTool(bodyForCreatingTool, {});

      //Assert
      expect(userService.findOneById).toBeCalledTimes(1);
      expect(toolsRepository.create).toBeCalledTimes(1);
      expect(toolsRepository.save).toBeCalledTimes(1);
      expect(toolTagsService.createRelation).toBeCalledTimes(2);
    });

    it('should throw an error when no user is found', async () => {
      // Act
      await toolsService.createTool(bodyForCreatingTool, {});
      jest.spyOn(userService, 'findOneById').mockRejectedValueOnce(undefined);
      expect(toolsService.createTool).rejects.toThrowError();
    });
  });

  describe('allTools', () => {
    it('should call all functions an correct amount of times', async () => {
      // Arrange
      jest
        .spyOn(toolsService, 'getTools')
        .mockImplementationOnce(async () => [new Tool()]);
      // Act
      const result = await toolsService.allTools(1);
      // Assert
      expect(result).toBeInstanceOf(Object);
    });
  });
});
