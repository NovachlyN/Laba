import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Stock } from './entities/stock.entity';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Post()
  create(@Body() createStockDto: CreateStockDto): Stock {
    return this.stocksService.create(createStockDto);
  }

  @Get()
  findAll(@Query('title') title?: string): Stock[] {
    return this.stocksService.findAll(title);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Stock {
    return this.stocksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto): Stock {
    return this.stocksService.update(+id, updateStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Stock {
    return this.stocksService.remove(+id);
  }
}
