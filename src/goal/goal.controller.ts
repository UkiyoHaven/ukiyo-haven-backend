import { Controller, Post, Get, Patch, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { GoalService } from './goal.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('goals')
@UseGuards(JwtAuthGuard)
export class GoalController {
  constructor(private goalService: GoalService) {}

  @Post()
  async createGoal(
    @Req() req,  // Move the required `req` parameter before the optional ones
    @Body('title') title: string,
    @Body('description') description?: string,
    @Body('deadline') deadline?: string,
  ) {
    const userId = req.user.id;
    const parsedDeadline = deadline ? new Date(deadline) : undefined;
    return this.goalService.createGoal(userId, title, description, parsedDeadline);
  }

  @Get()
  async getUserGoals(@Req() req) {
    const userId = req.user.id;
    return this.goalService.getUserGoals(userId);
  }

  @Patch(':id')
  async updateGoal(@Param('id') id: string, @Body('completed') completed: boolean, @Req() req) {
    const userId = req.user.id;
    return this.goalService.updateGoal(userId, parseInt(id), completed);
  }

  @Delete(':id')
  async deleteGoal(@Param('id') id: string, @Req() req) {
    const userId = req.user.id;
    return this.goalService.deleteGoal(userId, parseInt(id));
  }
}
