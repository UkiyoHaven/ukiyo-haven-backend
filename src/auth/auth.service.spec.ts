import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtService, PrismaService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
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
    jest.spyOn(jwtService, 'sign').mockImplementation(() => token);

    expect(await authService.login('test@test.com', 'password')).toEqual({
      access_token: token,
    });
  });

});
