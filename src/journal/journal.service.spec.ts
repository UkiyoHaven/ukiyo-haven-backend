import { Test, TestingModule } from '@nestjs/testing';
import { JournalService } from './journal.service';
import { PrismaService } from '../prisma/prisma.service';

describe('JournalService', () => {
  let journalService: JournalService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JournalService, PrismaService],
    }).compile();

    journalService = module.get<JournalService>(JournalService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(journalService).toBeDefined();
  });

  describe('createJournalEntry', () => {
    it('should create a new journal entry', async () => {
      const userId = 1;
      const entry = 'This is a test entry';
      const createdAt = new Date(); // Include createdAt
      const createdEntry = { id: 1, userId, entry, createdAt };

      jest.spyOn(prismaService.journal, 'create').mockResolvedValue(createdEntry);

      expect(await journalService.createJournalEntry(userId, entry)).toEqual(createdEntry);
    });
  });

  describe('getUserEntries', () => {
    it('should return a list of user entries', async () => {
      const userId = 1;
      const createdAt = new Date(); // Include createdAt
      const entries = [
        { id: 1, userId, entry: 'First entry', createdAt },
        { id: 2, userId, entry: 'Second entry', createdAt },
      ];

      jest.spyOn(prismaService.journal, 'findMany').mockResolvedValue(entries);

      expect(await journalService.getUserEntries(userId)).toEqual(entries);
    });
  });
});
