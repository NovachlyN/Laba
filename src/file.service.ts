import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

export interface FileAccessor {
  filePath: string;
}

@Injectable()
export class FileService<I> {
  private readonly filePath: string;

  constructor(filePath?: string) {
    if (filePath) {
      this.filePath = path.resolve(process.cwd(), 'src', filePath);
    }
  }

  public read<T extends I>(): T {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data) as T;
    } catch (error) {
      throw new Error(`Ошибка чтения файла: ${error.message}`);
    }
  }

  public add<T>(newData: T): void {
    const data = this.read();

    if (Array.isArray(data)) {
      data.push(newData);
    }

    this.write(data as I);
  }

  public write<T extends I>(data: T): void {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
      throw new Error(`Ошибка записи файла: ${error.message}`);
    }
  }
}