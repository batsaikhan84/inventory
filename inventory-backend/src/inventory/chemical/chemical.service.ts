import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chemical } from './chemical.entity';
import { ChemicalRepository } from './chemical.repository';

@Injectable()
export class ChemicalService {
    constructor(
        @InjectRepository(ChemicalRepository)
        private chemicalRepository: ChemicalRepository
    ) {}
    public async chemicalItems(): Promise<Chemical[]> {
        const chemicalRes = await this.chemicalRepository.find({ relations: ['master'] });
        if (!chemicalRes) {
            throw new NotFoundException();
        };
        return chemicalRes;
    };
    public async paginate(page: number, limit): Promise<any> {
        const [chemicalItems, totalPage] = await this.chemicalRepository.findAndCount({
            relations: ['master'],
            take: limit,
            skip: (page-1) * limit
        });
        return {
            data: chemicalItems,
            
            meta: {
                totalPage,
                showing: limit,
                page,
                lastPage: Math.ceil(totalPage/limit)
            }
        }
    }
}
