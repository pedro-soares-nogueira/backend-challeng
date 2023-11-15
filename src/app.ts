import { PrismaClient } from "@prisma/client";
import express from "express";
import multer from "multer";
import readline from "readline";
import { Readable } from "stream";
import { z } from "zod";
import cors from "cors";
import { uploadFile } from "./http/controllers/upload";

export const app = express();

const prisma = new PrismaClient();
const multerConfig = multer();
app.use(cors());

app.get("/documents", async (request, response) => {
    const documents = await prisma.document.findMany({});

    return response.status(201).json({ documents });
});

app.post("/upload", multerConfig.single("file"), uploadFile);

app.delete("/delete-all", async (request, response) => {
    await prisma.document.deleteMany({});

    return response.status(201).send();
});
