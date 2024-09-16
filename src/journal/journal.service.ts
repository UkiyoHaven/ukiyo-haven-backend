import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JournalService {
  constructor(private prisma: PrismaService) {}

  async createJournalEntry(userId: number, entry: string) {
    return this.prisma.journal.create({
      data: {
        entry,
        userId,
      },
    });
  }

  async getUserEntries(userId: number) {
    return this.prisma.journal.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateJournalEntry(userId: number, journalId: number, updatedEntry: string) {
    const journal = await this.prisma.journal.findUnique({ where: { id: journalId } });
    if (!journal) throw new NotFoundException('Journal entry not found');
    if (journal.userId !== userId) throw new ForbiddenException('You cannot edit this entry');

    return this.prisma.journal.update({
      where: { id: journalId },
      data: { entry: updatedEntry },
    });
  }

  async deleteJournalEntry(userId: number, journalId: number) {
    const journal = await this.prisma.journal.findUnique({ where: { id: journalId } });
    if (!journal) throw new NotFoundException('Journal entry not found');
    if (journal.userId !== userId) throw new ForbiddenException('You cannot delete this entry');

    return this.prisma.journal.delete({
      where: { id: journalId },
    });
  }
}
