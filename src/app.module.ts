import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { JournalController } from './journal/journal.controller';
import { JournalService } from './journal/journal.service';
import { ConfigModule } from '@nestjs/config';
import { DiscussionsGateway } from './discussions/discussions.gateway';
import { GoalController } from './goal/goal.controller';
import { GoalService } from './goal/goal.service';

@Module({
  imports: [AuthModule, PrismaModule, ConfigModule.forRoot()],
  controllers: [AppController, JournalController, GoalController],
  providers: [AppService, JournalService, DiscussionsGateway, GoalService],
})
export class AppModule {}
