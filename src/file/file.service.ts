import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

@Injectable()
export class FileService {
  createFile({
    staticPath,
    file,
  }: {
    staticPath: string;
    file: Express.Multer.File;
  }): string {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = `${uuid.v4()}.${fileExtension}`;
      const filePath = path.resolve(__dirname, '..', 'static', staticPath);

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
      return `${staticPath}/${fileName}`;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  removeAllFilesInDir({ staticPath }: { staticPath: string }) {
    const filePath = path.resolve(__dirname, '..', 'static', staticPath);
    if (!fs.existsSync(filePath)) return;

    fs.readdir(filePath, (err, files) => {
      if (err) throw err;
      for (const file of files) {
        fs.unlink(`${filePath}/${file}`, (err) => {
          if (err) throw err;
        });
      }
    });
  }

  removeDir({ staticPath }: { staticPath: string }) {
    const filePath = path.resolve(__dirname, '..', 'static', staticPath);
    if (!fs.existsSync(filePath)) return;
    fs.rmSync(filePath, { recursive: true, force: true });
  }

  removeFile(picturePath: string) {
    const filePath = path.resolve(__dirname, '..', 'static', picturePath);

    fs.unlink(filePath, (err) => {
      if (err) throw err;
    });
  }
}
