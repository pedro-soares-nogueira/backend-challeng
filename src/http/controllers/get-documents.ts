import { prisma } from "@/lib/prisma";
import { Request, Response } from "express";

export const getDocuments = async (request: Request, response: Response) => {
    const documents = await prisma.document.findMany({});

    return response.status(201).json({ documents });
};
