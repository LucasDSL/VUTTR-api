import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

const listOfUser = [new User(), new User(), new User()];
describe('UserService', () => {
  let userService: UserService;
  let userRepository: Repository<User>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn().mockResolvedValue(listOfUser[0]),
            create: jest.fn().mockResolvedValue(new User()),
            save: jest.fn().mockResolvedValue(new User()),
            getData: jest.fn().mockResolvedValue(new User()),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('findOneById and findOneByUsername', () => {
    it('should return one user', async () => {
      // Act
      const result = await userService.findOneById('idx');
      // Assert
      expect(result).toBeInstanceOf(User);
    });
  });

  describe('create user', () => {
    it('should return the created user', async () => {
      // Act
      const bodyForCreatingUser: CreateUserDto = {
        username: 'user',
        password: 'pass',
        email: '...@.com',
      };
      const result = await userService.create(bodyForCreatingUser);
      // Assert
      expect(result).toBeInstanceOf(User);
    });
  });

  describe('getData', () => {
    it('should return the information about specific user', async () => {
      // Act
      const result = await userService.getData({});
      // Assert
      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(User);
    });
  });
});
