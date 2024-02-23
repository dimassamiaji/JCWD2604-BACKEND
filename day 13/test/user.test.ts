/** @format */

import request from "supertest";

import app from "../app";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// describe("GET /api/users", () => {
//   it("should return an array of users", async () => {
//     const response = await request(app).get("/api/users");
//     expect(response.status).toBe(200);
//     expect(response.body.users).toEqual(["User 1", "User 2", "User 3"]);
//   });
// });

describe("GET /api/users with db", () => {
  const sampleData = [
    {
      firstName: "john",
      lastName: "doe",
      email: "john@mail.com",
      createdAt: new Date(),
    },
    {
      firstName: "jane",
      lastName: "dine",
      email: "jane.d@mail.com",
      createdAt: new Date(),
    },
  ];

  beforeAll(async () => {
    await prisma.$connect();
  });

  beforeEach(async () => {
    const user = await prisma.user.findMany();
    if (user.length == 0) {
      await prisma.user.createMany({
        data: sampleData,
      }); //untuk insert banyak data secara langsung , bulkInsert
      //   await prisma.user.create({
      //     data: sampleData[0],
      //   }); kalau satu satu gini ni guys - angga
    }
  });

  afterEach(async () => {
    await prisma.user.deleteMany({
      where: {
        // email: {
        //   in: sampleData.map((data) => data.email),
        // },
      },
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should return an array of users", async () => {
    const response = await request(app).get("/api/users");
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      message: "ok",
      users: sampleData.map(({ firstName, lastName, email }) => {
        return {
          firstName,
          lastName,
          email,
        };
      }),
    });
  });
});
