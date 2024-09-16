import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { JournalService } from './journal.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('journal')
export class JournalController {
  constructor(private journalService: JournalService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createEntry(@Body('entry') entry: string, @Req() req) {
    const userId = req.user.id;
    return this.journalService.createJournalEntry(userId, entry);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserEntries(@Req() req) {
    const userId = req.user.id;
    return this.journalService.getUserEntries(userId);
  }
}
