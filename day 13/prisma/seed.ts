/** @format */

import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      firstName: "john",
      lastName: "doe",
      email: "john@mail.com",
      createdAt: new Date(),
    },
  });

  await prisma.user.create({
    data: {
      firstName: "jane",
      lastName: "dine",
      email: "jane.d@mail.com",
      createdAt: new Date(),
    },
  });
}

main()
  .catch((e) => {
    console.log(e);

    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect;
  });
