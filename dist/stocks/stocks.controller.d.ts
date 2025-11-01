import { StocksService } from './stocks.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Stock } from './entities/stock.entity';
export declare class StocksController {
    private readonly stocksService;
    constructor(stocksService: StocksService);
    create(createStockDto: CreateStockDto): Stock;
    findAll(title?: string): Stock[];
    findOne(id: string): Stock;
    update(id: string, updateStockDto: UpdateStockDto): Stock;
    remove(id: string): Stock;
}
