import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Stock } from './entities/stock.entity';
import { FileService } from '../file.service';

@Injectable()
export class StocksService {
  constructor(private fileService: FileService<Stock[]>) {}

  create(createStockDto: CreateStockDto) {
    const stocks = this.fileService.read();
    const stock = { ...createStockDto, id: stocks.length + 1 };
    this.fileService.add(stock);
    return stock;
  }

  findAll(title?: string): Stock[] {
    const stocks = this.fileService.read();

    if (title) {
      return stocks.filter((stock) =>
        stock.title.toLowerCase().includes(title.toLowerCase()),
      );
    }

    return stocks;
  }

  findOne(id: number): Stock {
    const stocks = this.fileService.read();
    const stock = stocks.find((stock) => stock.id === id);
    
    if (!stock) {
      throw new NotFoundException(`Stock with ID ${id} not found`);
    }
    
    return stock;
  }

  update(id: number, updateStockDto: UpdateStockDto) {
    const stocks = this.fileService.read();
    const stockIndex = stocks.findIndex((stock) => stock.id === id);

    if (stockIndex === -1) {
      throw new NotFoundException(`Stock with ID ${id} not found`);
    }

    stocks[stockIndex] = { ...stocks[stockIndex], ...updateStockDto };
    this.fileService.write(stocks);
    
    return stocks[stockIndex];
  }

  remove(id: number) {
    const stocks = this.fileService.read();
    const stockIndex = stocks.findIndex((stock) => stock.id === id);

    if (stockIndex === -1) {
      throw new NotFoundException(`Stock with ID ${id} not found`);
    }

    const deletedStock = stocks.splice(stockIndex, 1)[0];
    this.fileService.write(stocks);
    
    return deletedStock;
  }
}