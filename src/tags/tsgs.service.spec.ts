import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('authController', () => {
  let controller: AuthController;
  let service: AuthService;
  const AuthServiceMock = {
    provide: AuthService,
    useValue: {
      validateUser: jest.fn(),
      login: jest.fn().mockResolvedValue({ accessToken: String }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthServiceMock],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('user login', () => {
    it('should return the token after successfull login', async () => {
      // Act
      const result = await controller.login({});
      // Assert
      expect(result).toEqual({ accessToken: String });
    });

    it('should return null after failed login', async () => {
      // Arrange
      jest.spyOn(service, 'validateUser').mockImplementationOnce(null);
      jest.spyOn(service, 'login').mockImplementationOnce(Object);
      // Assert
      expect(await controller.login({})).toEqual({});
    });
  });
});
