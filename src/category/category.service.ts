import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  create(name: string) {
    if (!name) {
      throw new BadRequestException('Category name is required');
    }
    return this.prisma.category.create({ data: { name } });
  }

  findAll() {
    return this.prisma.category.findMany({});
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { expenses: true },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  remove(id: number) {
    return this.prisma.category.delete({ where: { id } });
  }
}
