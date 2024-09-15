import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common';
import { JournalService } from './journal.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('journal')
export class JournalController {
  constructor(private journalService: JournalService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createEntry(@Body('entry') entry: string, @Req() req) {
    return this.journalService.createJournalEntry(req.user.userId, entry);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserEntries(@Req() req) {
    return this.journalService.getUserEntries(req.user.userId);
  }
}
