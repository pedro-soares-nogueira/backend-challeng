import { prisma } from "@/lib/prisma";
import { Request, Response } from "express";
import readline from "readline";
import { Readable } from "stream";

export const uploadFile = async (request: Request, response: Response) => {
    // const uploadSchema = z.object({
    //     name: z.string(),
    //     governmentId: z.number(),
    //     email: z.string(),
    //     debtAmount: z.number(),
    //     debtDueDate: z.string(),
    //     debtID: z.string(),
    // });

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
            throw new Error("There is no buffer on file");
        }
    } else {
        throw new Error("There is no file on request");
    }

    return response.status(201).json({ documents });
};

// const { file } = request;

// try {
//     await uploadUseCase({ file });
// } catch (error) {
//     return response.status(409).send();
// }

// return response.status(201).json();
