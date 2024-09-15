import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JournalService {
  constructor(private prisma: PrismaService) {}

  async createJournalEntry(userId: number, entry: string) {
    return this.prisma.journal.create({
      data: {
        userId,
        entry,
      },
    });
  }

  async getUserEntries(userId: number) {
    return this.prisma.journal.findMany({
      where: { userId },
    });
  }
}
