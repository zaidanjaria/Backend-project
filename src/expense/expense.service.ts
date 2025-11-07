import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExpenseDto, UpdateExpenseDto } from './dto';
import Papa from 'papaparse';

@Injectable()
export class ExpenseService {
  constructor(private prisma: PrismaService) {}

  selectedFields = {
    id: true,
    description: true,
    amount: true,
    date: true,
    category: { select: { id: true, name: true } },
    createdAt: true,
  };

  create(data: CreateExpenseDto) {
    return this.prisma.expense.create({ data });
  }

  findAll() {
    return this.prisma.expense.findMany({
      orderBy: { date: 'desc' },
      select: this.selectedFields,
    });
  }

  findByCategory(categoryId: number) {
    return this.prisma.expense.findMany({
      where: { categoryId },
      select: this.selectedFields,
      orderBy: { date: 'desc' },
    });
  }

  findOne(id: number) {
    return this.prisma.expense.findUnique({
      where: { id },
      select: this.selectedFields,
    });
  }

  update(id: number, data: UpdateExpenseDto) {
    return this.prisma.expense.update({
      where: { id },
      data,
      select: this.selectedFields,
    });
  }

  remove(id: number) {
    return this.prisma.expense.delete({ where: { id } });
  }

  async summary() {
    const expenses = await this.prisma.expense.findMany();
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    return {
      total,
      count: expenses.length,
      avg: +(total / expenses.length).toFixed(2),
    };
  }

  async summaryByMonth(month: number) {
    const currentYear = new Date().getFullYear();
    const expenses = await this.prisma.expense.findMany();
    const filtered = expenses.filter((e) => {
      const d = new Date(e.date);
      return d.getFullYear() === currentYear && d.getMonth() + 1 === month;
    });
    const total = filtered.reduce((sum, e) => sum + e.amount, 0);
    return { month, year: currentYear, total, count: filtered.length };
  }

  async exportAllToCsv() {
    const expenses = await this.findAll();
    // Prepare clean JSON for export
    const data = expenses.map((e) => ({
      ID: e.id,
      Description: e.description,
      Amount: e.amount,
      Category: e.category?.name || 'Uncategorized',
      Date: new Date(e.date).toISOString().split('T')[0],
      CreatedAt: new Date(e.createdAt).toISOString(),
    }));

    // ✅ Convert to CSV using PapaParse
    const csv = Papa.unparse(data, {
      quotes: true,
      header: true,
      skipEmptyLines: true,
    });
    return csv;
  }
}
