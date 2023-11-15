import { prisma } from "@/lib/prisma";
import readline from "readline";
import { Readable } from "stream";

interface UploadUseCaseRequest {
    file: Express.Multer.File;
}

export const uploadUseCase = async ({ file }: UploadUseCaseRequest) => {
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

    return file;
};

// const uploadSchema = z.object({
//     name: z.string(),
//     governmentId: z.number(),
//     email: z.string(),
//     debtAmount: z.number(),
//     debtDueDate: z.string(),
//     debtID: z.string(),
// });

// ------------------------------------------------------------------------------

// if (!file) {
//     throw new Error("There is no file on request");
// }

// const fileReader = new FileReader();
// console.log("file");

// fileReader.onload = async () => {
//     const buffer = fileReader.result as ArrayBuffer;

//     if (buffer) {
//         const readableFile = new Readable();
//         readableFile.push(Buffer.from(buffer));
//         readableFile.push(null);

//         const documentLine = readline.createInterface({
//             input: readableFile,
//         });

//         let firstLine = true;

//         for await (const line of documentLine) {
//             const documentLineSplit = line.split(",");

//             if (firstLine) {
//                 firstLine = false;
//                 continue;
//             }

//             const [
//                 name,
//                 governmentId,
//                 email,
//                 debtAmount,
//                 debtDueDate,
//                 debtID,
//             ] = documentLineSplit;

//             await prisma.document.create({
//                 data: {
//                     name,
//                     governmentId: Number(governmentId),
//                     email,
//                     debtAmount: Number(debtAmount),
//                     debtDueDate,
//                     debtID,
//                 },
//             });
//         }
//     } else {
//         throw new Error("There is no buffer on file");
//     }
// };

// fileReader.readAsArrayBuffer(file);
