/** @format */

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_URL } },
});

const data = [
  {
    email: "udin@mail.com",
    password: "$2b$10$pdGEAn.G2ocUQNpaPKK6HOsnuLgytgyO0GEY1sLcxHyPrpxVAMlf2",
    first_name: "udin",
    last_name: "dong",
    gender: "male",
    avatar_url:
      "https://www.bmw.co.id/content/dam/bmw/common/all-models/m-series/m3-sedan/2023/highlights/bmw-3-series-cs-m-automobiles-sp-desktop.jpg",
    id: 1,
    role: "user",
  },
  {
    email: "admin@mail.com",
    password: "$2b$10$pdGEAn.G2ocUQNpaPKK6HOsnuLgytgyO0GEY1sLcxHyPrpxVAMlf2",
    first_name: "admin",
    last_name: "",
    id: 2,
    role: "admin",
    avatar_url: "",
    products: {
      create: [
        {
          id: 1,
          product_name: "Nike Air Force 1 '07 Low White Swoosh Panda",
          image_url:
            "PRODUCT_2024-02-07-11-28-25-536-55bb7930-c571-1133-am092-813085b035b2.png",
          price: 1570000,
          description: "",
        },
        {
          id: 2,
          product_name: "Nike Dunk Low Grey Fo",
          image_url:
            "PRODUCT_2024-02-07-11-28-25-536-55bb7930-c571-1133-am092-813085b035b6.png",
          price: 1550000,
          description: "",
        },
        {
          id: 3,
          product_name: "Nike Dunk Low Polar Blue",
          image_url:
            "PRODUCT_2024-02-07-11-28-25-536-55bb7930-c571-1133-am092-813085b035b2.png",
          price: 1450000,
          description: "",
        },
        {
          id: 4,
          product_name: "Nike P-6000 Light Iron Ore",
          image_url:
            "PRODUCT_2024-02-07-11-28-25-536-55bb7930-c571-1133-am092-813085b035b4.png",
          price: 2050000,
          description: "",
        },
        {
          id: 5,
          product_name: "Nike SB Dunk Low The Powerpuff Girls Bubbles",
          image_url:
            "PRODUCT_2024-02-07-11-28-25-536-55bb7930-c571-1133-am092-813085b035b5.png",
          price: 4950000,
          description: "",
        },
      ],
    },
  },
];

async function main() {
  try {
    data.map(async (user) => {
      const newUser = await prisma.user.create({
        data: user,
      });
      console.log(`Created user with id: ${newUser.id}`);
    });
    console.log(`Seeding finished.`);
  } catch (error) {
    console.log(error);
  }
}

main()
  .then(() => {
    prisma.$disconnect;
  })
  .catch((err) => {
    console.log(err);
    prisma.$disconnect;
    process.exit(1);
  });
