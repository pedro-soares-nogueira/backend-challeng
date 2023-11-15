import { prisma } from "@/lib/prisma";
import { PrismaUploadRepository } from "@/repositories/prisma/prisma-upload-repository";
import { UploadRepository } from "@/repositories/upload-repository";
import readline from "readline";
import { Readable } from "stream";
import { GeneralHandlerError } from "./errors/general-handler-error";

interface UploadUseCaseRequest {
    file: Express.Multer.File;
}

export class UploadUseCase {
    constructor(private uploadRepository: UploadRepository) {}

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
                throw new GeneralHandlerError();
            }
        } else {
            throw new GeneralHandlerError();
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
