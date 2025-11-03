import { Module } from '@nestjs/common';
import { ExpenseModule } from './expense/expense.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [ExpenseModule, PrismaModule, CategoryModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
