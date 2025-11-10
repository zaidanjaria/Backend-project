import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Upsert categories
  const food = await prisma.category.upsert({
    where: { name: 'Food' },
    update: {},
    create: { name: 'Food' },
  });

  const transport = await prisma.category.upsert({
    where: { name: 'Transport' },
    update: {},
    create: { name: 'Transport' },
  });

  // Create sample expenses (with tags)
  await prisma.expense.create({
    data: {
      description: 'Office Lunch',
      amount: 12.5,
      date: new Date(),
      categoryId: food.id,
    },
  });

  await prisma.expense.create({
    data: {
      description: 'Grocery Shopping',
      amount: 55.0,
      date: new Date(),
      categoryId: food.id,
    },
  });

  await prisma.expense.create({
    data: {
      description: 'Taxi Ride',
      amount: 8.75,
      date: new Date(),
      categoryId: transport.id,
    },
  });

  console.log('✅ Seeding finished');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
