import { Request, Response } from "express";
import env from "../config/config";
import Hook from "../config/utils";

export default class FileMiddleware {
    static maxFileSize(req: Request, res: Response, next: any) {
        const size = req.file?.size;
        if (size) {
            if (size >= 1) return res.json(Hook.Message(true, 413, 'File exceeds the maximum size'));
            return next();
        }
        return res.json(Hook.Message(true, 402, 'Required File'));
    }
}