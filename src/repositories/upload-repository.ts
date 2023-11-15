import { Prisma, Document } from "@prisma/client";

export interface UploadRepository {
    upload(data: Prisma.DocumentCreateInput): Promise<Document>;
}
