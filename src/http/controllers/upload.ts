import { PrismaUploadRepository } from "@/repositories/prisma/prisma-upload-repository";
import { GeneralHandlerError } from "@/use-cases/errors/general-handler-error";
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
        if (error instanceof GeneralHandlerError) {
            return response.status(409).send({ message: error.message });
        }
        throw error;

        // return response.status(500).send(); // TODO: fix me
    }
    return response.status(201).json();
};
