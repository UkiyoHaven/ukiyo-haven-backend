import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, PrismaService, JwtService],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('should register a user', async () => {
    const result = { id: 1, username: 'testuser', email: 'test@test.com', password: 'password' };
    jest.spyOn(authService, 'register').mockResolvedValue(result);

    expect(
      await authController.register('testuser', 'test@test.com', 'password'),
    ).toBe(result);
  });

  it('should login a user', async () => {
    const token = 'test-token';
    const user = { username: 'testuser', id: 1, email: 'test@test.com', password: 'password' };

    // Mock the validateUser method to return a user
    jest.spyOn(authService, 'validateUser').mockResolvedValue(user);
    jest.spyOn(authService, 'login').mockResolvedValue({ access_token: token });

    expect(await authController.login('test@test.com', 'password')).toEqual({
      access_token: token,
    });
  });
});
