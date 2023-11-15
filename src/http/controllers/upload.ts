import { PrismaUploadRepository } from "@/repositories/prisma-users-repository";
import { UploadUseCase } from "@/use-cases/upload";
import { Request, Response } from "express";

export const uploadFile = async (request: Request, response: Response) => {
    const { file } = request;

    if (!file) {
        throw new Error("There is no file");
    }

    try {
        const uploadRepository = new PrismaUploadRepository();
        const uploadUseCase = new UploadUseCase(uploadRepository);

        await uploadUseCase.execute({ file });
    } catch (error) {
        return response.status(409).send();
    }
    return response.status(201).json();
};
