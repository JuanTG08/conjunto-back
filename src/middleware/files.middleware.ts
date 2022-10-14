import { NextFunction, Request, Response } from "express";
import Hook from "../config/utils";
import Multer from "../libs/multer";
import multer from "multer";

export default class FileMiddleware {
  static saveImage(req: Request, res: Response, next: NextFunction): void {
    const _multer = new Multer()._multer().single("file");
    _multer(req, res, function (err) {
      if (err instanceof multer.MulterError || err)
        return res.json(Hook.Message(false, 500, "File Not Supported | File Very Long"));
      next();
    });
  }
}
