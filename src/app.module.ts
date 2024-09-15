import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { JournalController } from './journal/journal.controller';
import { JournalService } from './journal/journal.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule, PrismaModule, ConfigModule.forRoot()],
  controllers: [AppController, JournalController],
  providers: [AppService, JournalService],
})
export class AppModule {}
