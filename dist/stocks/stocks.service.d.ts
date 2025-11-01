import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Stock } from './entities/stock.entity';
import { FileService } from '../file.service';
export declare class StocksService {
    private fileService;
    constructor(fileService: FileService<Stock[]>);
    create(createStockDto: CreateStockDto): {
        id: number;
        src: string;
        title: string;
        text: string;
    };
    findAll(title?: string): Stock[];
    findOne(id: number): Stock;
    update(id: number, updateStockDto: UpdateStockDto): Stock;
    remove(id: number): Stock;
}
