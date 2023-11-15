import { uploadUseCase } from "@/use-cases/upload";
import { Request, Response } from "express";

export const uploadFile = async (request: Request, response: Response) => {
    // const uploadSchema = z.object({
    //     name: z.string(),
    //     governmentId: z.number(),
    //     email: z.string(),
    //     debtAmount: z.number(),
    //     debtDueDate: z.string(),
    //     debtID: z.string(),
    // });

    const { file } = request;

    if (!file) {
        throw new Error("There is no file");
    }

    try {
        await uploadUseCase({ file });
    } catch (error) {
        return response.status(409).send();
    }
    return response.status(201).json();
};
