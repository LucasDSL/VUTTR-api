import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;
  const UserServiceMock = {
    provide: UserService,
    useValue: {
      create: jest.fn().mockResolvedValue(new User()),
      getData: jest.fn().mockResolvedValue(new User()),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserServiceMock],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
  const body: CreateUserDto = {
    username: 'user',
    password: 'pass',
    email: '...@...com',
  };

  describe('post user', () => {
    it('should return the created user', async () => {
      //Act

      const result = await controller.create(body);
      //Assert
      expect(result).toBeInstanceOf(User);
      expect(service.create).toHaveBeenCalledTimes(1);
    });

    it('should throw an error', () => {
      //Arrange
      jest.spyOn(controller, 'create').mockRejectedValueOnce(new Error());

      //Assert
      expect(
        controller.create({ ...body, password: undefined }),
      ).rejects.toThrowError();
    });
  });

  describe('get new user', () => {
    it('should return a user', async () => {
      const result = await controller.getData({ id: 1 });
      expect(result).toBeInstanceOf(User);
      expect(service.getData).toBeCalledTimes(1);
    });
  });
});
