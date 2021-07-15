import { CreateExtractionDto } from './create-extraction.dto';
import { Extraction } from './extraction.entity';
import { ExtractionRepository } from './extraction.repository';
import { Injectable, NotFoundException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from '../email/email.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ExtractionService {
    constructor(
        @InjectRepository(ExtractionRepository)
        private extractionRepository: ExtractionRepository,
        private emailService: EmailService
    ) {}
    @Cron('01 00 7 * * 2')
    // @Cron('46 * * * * *')
    public async scheduledExtractionItems() {
        const extractionItemsRes = await this.extractionRepository.find({relations: ['master']});
        if(!extractionItemsRes) {
            throw new NotFoundException();
        };
        const scheduledItems = this.extractionRepository.getExtractionItemsForEmail(extractionItemsRes);
        if(scheduledItems.length > 0) {
            this.emailService.sendScheduledEmail(scheduledItems, 'Extraction')
        }
    }
    public async extractionItems(): Promise<Extraction[]> {
        const extractionItemsRes = await this.extractionRepository.find({relations: ['master']});
        if(!extractionItemsRes) {
            throw new NotFoundException();
        };
        return extractionItemsRes;
    }
    public async extractionItem(id: number): Promise<Extraction> {
        const extractionItem = await this.extractionRepository.findOne(id, {relations: ['master']});
        if(!extractionItem) {
            throw new NotFoundException();
        }
        return extractionItem
    }
    public async extractionMasterItems(): Promise<Extraction[]> {
        const extractionItemsRes = await this.extractionRepository.find({relations: ['master']});
        if(!extractionItemsRes) {
            throw new NotFoundException();
        };
        return this.extractionRepository.getExtractionMasterItems(extractionItemsRes);
    };
    public async extractionMasterItem(id: number): Promise<Extraction> {
        const extractionItemsRes = await this.extractionRepository.find({relations: ['master']});
        if(!extractionItemsRes) {
            throw new NotFoundException();
        }
        return this.extractionRepository.getTotalItem(extractionItemsRes, id);
    }
    public async createExtractionItem(createExtractionDto: CreateExtractionDto): Promise<Extraction> {
        return this.extractionRepository.createExtractionItem(createExtractionDto);
    }
    public async deleteExtractionItem(id: number): Promise<void> {
        const result = await this.extractionRepository.delete(id)
        if(result.affected === 0) {
            throw new NotFoundException();
        }
    }
    public async updateExtractionItem(id: number, createExtractionDto: CreateExtractionDto): Promise<Extraction> {
        const extractionItem = await this.extractionItem(id)
        extractionItem.ID = createExtractionDto.ID;
        extractionItem.Item_ID = createExtractionDto.Item_ID;
        extractionItem.Location = createExtractionDto.Location;
        extractionItem.Quantity = createExtractionDto.Quantity;
        extractionItem.Usage_Level = createExtractionDto.Usage_Level;
        extractionItem.Min_Quantity = createExtractionDto.Min_Quantity;
        extractionItem.Max_Quantity = createExtractionDto.Max_Quantity;
        await extractionItem.save();
        return extractionItem;
    }
}
