import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JournalService {
  constructor(private prisma: PrismaService) {}

  async createJournalEntry(userId: number, entry: string) {
    console.log('Creating journal entry for user:', userId);  // Add log for debugging
    return this.prisma.journal.create({
      data: {
        entry,
        userId,  // Associate journal entry with the correct user
      },
    });
  }

  async getUserEntries(userId: number) {
    return this.prisma.journal.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },  // Return entries sorted by date
    });
  }
}
