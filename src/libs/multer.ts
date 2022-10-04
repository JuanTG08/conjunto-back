import multer from 'multer';
import { v4 as uuid } from 'uuid';
import path from 'path';
import env from "../config/config";

const storage = multer.diskStorage({
    destination: 'uploads/active-files/',
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname));
    },
});

export default multer({ storage });