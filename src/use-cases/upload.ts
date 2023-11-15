import { prisma } from "@/lib/prisma";
import readline from "readline";
import { Readable } from "stream";
import { z } from "zod";

interface UploadUseCaseRequest {
    file: Express.Multer.File;
}

export const uploadUseCase = async ({ file }: UploadUseCaseRequest) => {
    // const uploadSchema = z.object({
    //     name: z.string(),
    //     governmentId: z.number(),
    //     email: z.string(),
    //     debtAmount: z.number(),
    //     debtDueDate: z.string(),
    //     debtID: z.string(),
    // });
};

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
