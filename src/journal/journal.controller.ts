// src/journal/journal.controller.ts
import { Controller, Get, Post, Patch, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
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

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateEntry(@Param('id') id: string, @Body('entry') entry: string, @Req() req) {
    const userId = req.user.id;
    return this.journalService.updateJournalEntry(userId, parseInt(id), entry);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteEntry(@Param('id') id: string, @Req() req) {
    const userId = req.user.id;
    return this.journalService.deleteJournalEntry(userId, parseInt(id));
  }
}
