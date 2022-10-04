import multer from "multer";
import { v4 as uuid } from "uuid";
import path from "path";
import env from "../config/config";
import { Request } from "express";

export default class MulterMix {
  fileSize: number;
  files: number;
  fileType: string;

  constructor(private destination: string = "uploads/active-files/") {
    this.fileSize = env.MAX_FILE_SIZE;
    this.files = 1;
    this.fileType = "image/";
  }

  public setLimitsFile(fileSize: number, files: number, fileType: string) {
    this.fileSize = fileSize;
    this.files = files;
    this.fileType = fileType;
  }

  private setStorage(): multer.StorageEngine {
    return multer.diskStorage({
      destination: this.destination,
      filename(req, file, cb) {
        cb(null, uuid() + path.extname(file.originalname));
      },
    });
  }

  private limitsFile() {
    return {
      fileSize: this.fileSize,
      fieldSize: this.fileSize,
      files: this.files,
    };
  }

  _multer(): multer.Multer {
    return multer({
      storage: this.setStorage(),
      limits: this.limitsFile(),
      fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback): void => {
        const type = file.mimetype.startsWith(this.fileType);
        type ? cb(null, true) : cb(new Error("File type not supported"));
      },
    });
  }
}
