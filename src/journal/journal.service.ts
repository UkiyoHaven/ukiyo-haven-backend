import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JournalService {
  constructor(private prisma: PrismaService) {}

  async createJournalEntry(userId: number, entry: string) {
    console.log(`Creating journal entry for user ID: ${userId}`);
    const newEntry = await this.prisma.journal.create({
      data: {
        entry,
        userId,
      },
    });
    console.log(`Created entry with ID: ${newEntry.id}`);
    return newEntry;
  }

  async getUserEntries(userId: number) {
    console.log(`Fetching journal entries for user ID: ${userId}`);
    return this.prisma.journal.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateJournalEntry(userId: number, journalId: number, updatedEntry: string) {
    console.log(`Attempting to update entry ID: ${journalId} for user ID: ${userId}`);
    const journal = await this.prisma.journal.findUnique({ where: { id: journalId } });
    if (!journal) {
      console.log(`Update failed: Entry ID: ${journalId} not found`);
      throw new NotFoundException('Journal entry not found');
    }
    if (journal.userId !== userId) {
      console.log(`Update failed: User ID: ${userId} not authorized to update entry ID: ${journalId}`);
      throw new ForbiddenException('You cannot edit this entry');
    }

    const updated = await this.prisma.journal.update({
      where: { id: journalId },
      data: { entry: updatedEntry },
    });
    console.log(`Updated entry ID: ${journalId} with new content`);
    return updated;
  }

  async deleteJournalEntry(userId: number, journalId: number) {
    console.log(`Attempting to delete entry ID: ${journalId} for user ID: ${userId}`);
    const journal = await this.prisma.journal.findUnique({ where: { id: journalId } });
    if (!journal) {
      console.log(`Delete failed: Entry ID: ${journalId} not found`);
      throw new NotFoundException('Journal entry not found');
    }
    if (journal.userId !== userId) {
      console.log(`Delete failed: User ID: ${userId} not authorized to delete entry ID: ${journalId}`);
      throw new ForbiddenException('You cannot delete this entry');
    }

    const deleted = await this.prisma.journal.delete({
      where: { id: journalId },
    });
    console.log(`Deleted entry ID: ${journalId}`);
    return deleted;
  }
}
