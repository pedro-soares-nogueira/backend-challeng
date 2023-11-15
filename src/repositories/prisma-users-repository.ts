import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class PrismaUploadRepository {
    async upload(data: Prisma.DocumentCreateInput) {
        const document = await prisma.document.create({
            data,
        });
        return document;
    }
}
