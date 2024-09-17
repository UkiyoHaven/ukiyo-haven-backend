import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GoalService {
  constructor(private prisma: PrismaService) {}

  async createGoal(userId: number, title: string, description?: string, deadline?: Date) {
    const newGoal = await this.prisma.goal.create({
      data: {
        title,
        description,
        deadline,
        userId,
      },
    });
    console.log(`Created Goal with ID: ${newGoal.id}`);
    return newGoal;
  }

  async getUserGoals(userId: number) {
    return this.prisma.goal.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateGoal(userId: number, goalId: number, completed: boolean) {
    const goal = await this.prisma.goal.findUnique({ where: { id: goalId } });
    if (!goal) throw new NotFoundException('Goal not found');
    if (goal.userId !== userId) throw new ForbiddenException('You cannot edit this goal');

    return this.prisma.goal.update({
      where: { id: goalId },
      data: { completed },
    });
  }

  async deleteGoal(userId: number, goalId: number) {
    const goal = await this.prisma.goal.findUnique({ where: { id: goalId } });
    if (!goal) throw new NotFoundException('Goal not found');
    if (goal.userId !== userId) throw new ForbiddenException('You cannot delete this goal');

    return this.prisma.goal.delete({
      where: { id: goalId },
    });
  }
}
