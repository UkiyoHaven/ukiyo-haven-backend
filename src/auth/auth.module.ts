import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,  // Use the secret from environment variables
      signOptions: { expiresIn: '60m' },
    }),
    ConfigModule,
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, PrismaService],
  controllers: [AuthController],
  exports: [JwtAuthGuard],  // Export JwtAuthGuard for use in other modules
})
export class AuthModule {}
