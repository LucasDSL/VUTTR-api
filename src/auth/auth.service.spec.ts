import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findOneByUserName: jest.fn().mockResolvedValue(
              new User({
                username: 'name',
                email: 'email@email.com',
                password: 'ahsdjfklasdflçkj',
              }),
            ),
          },
        },
        {
          provide: JwtService,
          useValue: {},
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return the user', async () => {
      // Arrange
      jest
        .spyOn(authService, 'validateUser')
        .mockResolvedValueOnce(new User({}));
      const result = await authService.validateUser('name', 'pass');
      // Assert
      expect(result).toBeInstanceOf(User);
    });

    it('should return nothing', async () => {
      // Arrange
      jest.spyOn(authService, 'validateUser').mockResolvedValueOnce(null);
      const result = await authService.validateUser('name', 'pass');
      // Assert
      expect(result).toEqual(null);
    });
  });

  describe('login', () => {
    it('should return the accessToken', async () => {
      // Arrange
      jest
        .spyOn(authService, 'login')
        .mockResolvedValueOnce({ accessToken: '' });
      // Act
      const result = await authService.login(new User());
      // Assert
      expect(result).toEqual({ accessToken: '' });
    });
  });
});
