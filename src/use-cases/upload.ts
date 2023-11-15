import { prisma } from "@/lib/prisma";
import { PrismaUploadRepository } from "@/repositories/prisma-users-repository";
import readline from "readline";
import { Readable } from "stream";

interface UploadUseCaseRequest {
    file: Express.Multer.File;
}

export class UploadUseCase {
    constructor(private uploadRepository: any) {}

    async execute({ file }: UploadUseCaseRequest) {
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

                // const prismaUploadRepositry = new PrismaUploadRepository();

                for await (let {
                    name,
                    governmentId,
                    email,
                    debtAmount,
                    debtDueDate,
                    debtID,
                } of documents) {
                    await this.uploadRepository.upload({
                        name,
                        governmentId,
                        email,
                        debtAmount,
                        debtDueDate,
                        debtID,
                    });
                }
            } else {
                throw new Error("There is no buffer on file");
            }
        } else {
            throw new Error("There is no file on request");
        }

        return file;
    }
}

// ------------------------------------------------------------------------------

// const uploadSchema = z.object({
//     name: z.string(),
//     governmentId: z.number(),
//     email: z.string(),
//     debtAmount: z.number(),
//     debtDueDate: z.string(),
//     debtID: z.string(),
// });

// ------------------------------------------------------------------------------
