import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtService, PrismaService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should hash the password', async () => {
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);

    expect(await bcrypt.compare(password, hashedPassword)).toBe(true);
  });

  it('should return a JWT token', async () => {
    const token = 'test-token';
    const user = { id: 1, username: 'testuser', email: 'test@test.com', password: 'password' };

    // Mock the validateUser method to return a user
    jest.spyOn(authService, 'validateUser').mockResolvedValue(user);
    jest.spyOn(jwtService, 'sign').mockReturnValue(token);

    expect(await authService.login('test@test.com', 'password')).toEqual({
      access_token: token,
    });
  });
});
