import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { UploadRepository } from "../upload-repository";

export class PrismaUploadRepository implements UploadRepository {
    async upload(data: Prisma.DocumentCreateInput) {
        const document = await prisma.document.create({
            data,
        });
        return document;
    }
}
