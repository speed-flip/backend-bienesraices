import multer from 'multer';

import path from 'path';
import fs from 'fs';

export interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderPath = path.join(__dirname, '..', '..', 'public', 'img');

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    cb(null, folderPath);
  },
  filename: (req, file, cb) => {
    const randomId = Math.random().toString(32).substring(2);
    cb(null, `${req.body.tipo}-${Date.now()}-${randomId}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

export default upload;
