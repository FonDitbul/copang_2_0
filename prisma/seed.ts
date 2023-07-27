import { PrismaClient } from '@prisma/client';
import { createSeller } from './seed.seller';
const prisma = new PrismaClient();
async function main() {
  for (const seller of createSeller) {
    await prisma.seller.create({
      data: seller,
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

// command : prisma db seed
