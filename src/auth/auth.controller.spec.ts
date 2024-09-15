import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('should register a user', async () => {
    const result = { username: 'testuser', email: 'test@test.com' };
    jest.spyOn(authService, 'register').mockImplementation(async () => result);

    expect(
      await authController.register('testuser', 'test@test.com', 'password'),
    ).toBe(result);
  });

  it('should login a user', async () => {
    const token = 'test-token';
    jest.spyOn(authService, 'login').mockImplementation(async () => ({ access_token: token }));

    expect(await authController.login('test@test.com', 'password')).toEqual({ access_token: token });
  });
});
