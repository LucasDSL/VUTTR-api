import { Test, TestingModule } from '@nestjs/testing';
import { ToolsService } from './tools.service';
import { Tool } from './tool.entity';
import { ToolsController } from './tools.controller';

describe('ToolControler', () => {
  let controller: ToolsController;
  let service: ToolsService;

  const ToolsServiceMock = {
    provide: ToolsService,
    useValue: {
      createTool: jest.fn(),
      validateTags: jest.fn(),
      allTools: jest.fn(),
      getTools: jest.fn(),
      findTagsByTool: jest.fn(),
      delete: jest.fn(),
      getByTag: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ToolsController],
      providers: [ToolsServiceMock],
    }).compile();

    controller = module.get<ToolsController>(ToolsController);
    service = module.get<ToolsService>(ToolsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
