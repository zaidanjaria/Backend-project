import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.ExpenseCreateInput) {
    return this.prisma.expense.create({ data });
  }

  findAll() {
    return this.prisma.expense.findMany({ orderBy: { date: 'desc' } });
  }

  findOne(id: number) {
    return this.prisma.expense.findUnique({ where: { id } });
  }

  update(id: number, data: Prisma.ExpenseUpdateInput) {
    return this.prisma.expense.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.expense.delete({ where: { id } });
  }
}
