import { Test, TestingModule } from '@nestjs/testing';
import { JournalController } from './journal.controller';
import { JournalService } from './journal.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

// Create a custom type for the request object
interface MockRequest extends Partial<Request> {
  user?: {
    userId: number;
  };
}

describe('JournalController', () => {
  let journalController: JournalController;
  let journalService: JournalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JournalController],
      providers: [
        {
          provide: JournalService,
          useValue: {
            createJournalEntry: jest.fn(),
            getUserEntries: jest.fn(),
          },
        },
        {
          provide: JwtAuthGuard,
          useValue: {
            canActivate: (context: ExecutionContext) => true, // Mock JwtAuthGuard
          },
        },
      ],
    }).compile();

    journalController = module.get<JournalController>(JournalController);
    journalService = module.get<JournalService>(JournalService);
  });

  it('should be defined', () => {
    expect(journalController).toBeDefined();
  });

  describe('createEntry', () => {
    it('should create a journal entry', async () => {
      const entry = 'Test entry';
      const userId = 1;
      const req: MockRequest = {
        user: { userId },
      };

      jest.spyOn(journalService, 'createJournalEntry').mockResolvedValue({
        id: 1,
        userId,
        entry,
        createdAt: new Date(),
      });

      expect(await journalController.createEntry(entry, req as Request)).toEqual({
        id: 1,
        userId,
        entry,
        createdAt: expect.any(Date),
      });

      expect(journalService.createJournalEntry).toHaveBeenCalledWith(userId, entry);
    });
  });

  describe('getUserEntries', () => {
    it('should return user journal entries', async () => {
      const userId = 1;
      const entries = [
        { id: 1, userId, entry: 'Test entry 1', createdAt: new Date() },
        { id: 2, userId, entry: 'Test entry 2', createdAt: new Date() },
      ];
      const req: MockRequest = {
        user: { userId },
      };

      jest.spyOn(journalService, 'getUserEntries').mockResolvedValue(entries);

      expect(await journalController.getUserEntries(req as Request)).toEqual(entries);

      expect(journalService.getUserEntries).toHaveBeenCalledWith(userId);
    });
  });
});
