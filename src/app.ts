import fastify from "fastify";
import { PrismaClient } from "@prisma/client";

export const app = fastify();

const prisma = new PrismaClient();

// prisma.document.create({
//     data: {
//         name: "John Doe",
//         governmentId: 11111111111,
//         email: "johndoe@kanastra.com.br",
//         debtAmount: 1000000.0,
//         debtDueDate: "2022-10-12",
//         debtID: "12,1adb6ccf-ff16-467f-bea7-5f05d494280f",
//     },
// });
