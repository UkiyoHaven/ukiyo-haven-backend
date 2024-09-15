import { Test, TestingModule } from '@nestjs/testing';
import { JournalController } from './journal.controller';
import { JournalService } from './journal.service';
import { PrismaService } from '../prisma/prisma.service';

describe('JournalController', () => {
  let controller: JournalController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JournalController, JournalService],
      providers : [JournalService, PrismaService]
    }).compile();

    controller = module.get<JournalController>(JournalController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
