import fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

export const app = fastify();

const prisma = new PrismaClient();

app.post("/upload", async (request, reply) => {
    const uploadBodySchema = z.object({
        name: z.string(), // "John Doe",
        governmentId: z.number(), // 11111111111,
        email: z.string(), // "johndoe@kanastra.com.br",
        debtAmount: z.number(), // 1000000.0,
        debtDueDate: z.string(), // "2022-10-12",
        debtID: z.string(), // "12,1adb6ccf-ff16-467f-bea7-5f05d494280f",
    });

    const { debtAmount, debtDueDate, debtID, email, governmentId, name } =
        uploadBodySchema.parse(request.body);

    await prisma.document.create({
        data: {
            name,
            governmentId,
            email,
            debtAmount,
            debtDueDate,
            debtID,
        },
    });

    return reply.status(201).send();
});

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
