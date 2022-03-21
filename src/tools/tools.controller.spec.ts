import { Test, TestingModule } from '@nestjs/testing';
import { ToolsService } from './tools.service';
import { Tool } from './tool.entity';
import { ToolsController } from './tools.controller';
import { CreateToolDto } from './dto/create-tool.dto';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { DeleteResult } from 'typeorm';

const listOfTools: Tool[] = [new Tool(), new Tool()];

describe('ToolControler', () => {
  let controller: ToolsController;
  let service: ToolsService;

  const ToolsServiceMock = {
    provide: ToolsService,
    useValue: {
      createTool: jest.fn().mockResolvedValue(undefined),
      validateTags: jest.fn(),
      allTools: jest.fn().mockResolvedValue(listOfTools),
      getTools: jest.fn(),
      findTagsByTool: jest.fn(),
      delete: jest.fn().mockResolvedValue(new DeleteResult()),
      getByTag: jest.fn().mockResolvedValue(listOfTools),
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

  const bodyForCreatingTool: CreateToolDto = {
    name: 'this',
    tags: ['this', 'that', 'task'],
    link: '.com',
    description: 'nice description',
  };
  describe('posting new tag', () => {
    it('should post a tag and return nothing', async () => {
      // Act
      const result = await controller.create(bodyForCreatingTool, {});

      // Assert
      expect(result).toEqual(undefined);
    });

    it('should throw an error', () => {
      // Arrange
      jest.spyOn(service, 'createTool').mockRejectedValueOnce(new Error());

      //Assert
      expect(controller.create(bodyForCreatingTool, {})).rejects.toThrowError();
    });
  });

  describe('getting tools', () => {
    it('should return a list of tools', async () => {
      // Act
      const result = await controller.getTools();
      //Assert
      expect(result).toBeDefined();
      expect(service.allTools).toBeCalledTimes(1);
      expect(result).toBeInstanceOf(Array);
    });

    it('should return a list of tools with given tag', async () => {
      // Act
      const result = await controller.getTools(1, 'this');
      // Assert
      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Array);
    });

    it('should throw an error for inexisting tag', async () => {
      jest
        .spyOn(service, 'getByTag')
        .mockRejectedValueOnce(new BadRequestException());

      expect(controller.getTools(1, 'inexisting tag')).rejects.toThrowError();
    });
  });

  describe('delete tool', () => {
    it('should delete a tool', async () => {
      // Act
      const result = await controller.deleteTool('id', {});
      //Assert
      expect(result).toBeInstanceOf(DeleteResult);
    });

    it("should throw a error as user try to delete tool that he didn't post", async () => {
      // Arrange
      jest
        .spyOn(service, 'delete')
        .mockRejectedValueOnce(new UnauthorizedException());
      //Assert
      expect(controller.deleteTool('id', {})).rejects.toThrowError(
        UnauthorizedException,
      );
    });
  });
});
