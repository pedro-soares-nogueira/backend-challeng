import { PrismaClient } from "@prisma/client";
import express from "express";
import multer from "multer";
import readline from "readline";
import { Readable } from "stream";
import { z } from "zod";
import cors from "cors";

export const app = express();

const prisma = new PrismaClient();
const multerConfig = multer();
app.use(cors());

app.post("/upload", multerConfig.single("file"), async (request, response) => {
    const uploadSchema = z.object({
        name: z.string(),
        governmentId: z.number(),
        email: z.string(),
        debtAmount: z.number(),
        debtDueDate: z.string(),
        debtID: z.string(),
    });

    const { file } = request;

    const documents = [];
    let firstLine = true;

    if (file) {
        const { buffer } = file;

        if (buffer) {
            const readableFile = new Readable();
            readableFile.push(buffer);
            readableFile.push(null);

            const documentLine = readline.createInterface({
                input: readableFile,
            });

            for await (let line of documentLine) {
                const documentLineSlit = line.split(",");

                // ignore the first line which is a header
                if (firstLine) {
                    firstLine = false;
                    continue;
                }

                documents.push({
                    name: documentLineSlit[0],
                    governmentId: Number(documentLineSlit[1]),
                    email: documentLineSlit[2],
                    debtAmount: Number(documentLineSlit[3]),
                    debtDueDate: documentLineSlit[4],
                    debtID: documentLineSlit[5],
                });
            }

            for await (let {
                name,
                governmentId,
                email,
                debtAmount,
                debtDueDate,
                debtID,
            } of documents) {
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
            }
        } else {
        }
    } else {
    }

    return response.status(201).json({ documents });
});

app.delete("/delete-all", async (request, response) => {
    await prisma.document.deleteMany({});

    return response.status(201).send();
});
