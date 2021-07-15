import { CreateQualityDto } from './create-quality.dto';
import { Quality } from './quality.entity';
import { QualityRepository } from './quality.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron } from '@nestjs/schedule';
import { EmailService } from '../email/email.service';

@Injectable()
export class QualityService {
    constructor(
        @InjectRepository(QualityRepository)
        private qualityRepository: QualityRepository,
        private emailService: EmailService
    ) {}
    @Cron('01 00 7 * * 2')
    // @Cron('47 * * * * *')
    public async scheduledQualityItems() {
        const qualityItemsRes = await this.qualityRepository.find({relations: ['master']});
        if(!qualityItemsRes) {
            throw new NotFoundException();
        };
        const scheduledItems = this.qualityRepository.getQualityItemsForEmail(qualityItemsRes);
        if(scheduledItems.length > 0) {
            this.emailService.sendScheduledEmail(scheduledItems, 'Quality')
        } 
    }
    public async qualityMasterItems(): Promise<Quality[]> {
        const qualityItems = await this.qualityRepository.find({ relations: ['master'] })
        if(!qualityItems) {
            throw new NotFoundException();
        }
        return this.qualityRepository.getQualityMasterItems(qualityItems);
    }
    public async qualityMaterItem(id: number): Promise<Quality> {
        const qualityItemsRes = await this.qualityRepository.find({relations: ['master']})
        if(!qualityItemsRes) {
            throw new NotFoundException();
        }
        return this.qualityRepository.getQualityMasterItem(qualityItemsRes, id)
    }
    public async qualityItems(): Promise<Quality[]> {
        const qualityItems = await this.qualityRepository.find({ relations: ['master'] })
        if(!qualityItems) {
            throw new NotFoundException();
        }
        return qualityItems;
    }
    public async qualityItem(id: number): Promise<Quality> {
        const qualityItem = await this.qualityRepository.findOne(id);
        if(!qualityItem) {
            throw new NotFoundException();
        }
        return qualityItem
    }
    public async createQualityItem(createQualityDto: CreateQualityDto): Promise<Quality> {
        return this.qualityRepository.createQualityItem(createQualityDto);
    }
    public async deleteQualityItem(id: number): Promise<void> {
        const result = await this.qualityRepository.delete(id)
        if(result.affected === 0) {
            throw new NotFoundException();
        }
    }
    public async updateQualityItem(id: number, createQualityDto: CreateQualityDto): Promise<Quality> {
        const qualityItem = await this.qualityItem(id)
        qualityItem.ID = createQualityDto.ID;
        qualityItem.Item_ID = createQualityDto.Item_ID;
        qualityItem.Location = createQualityDto.Location;
        qualityItem.Quantity = createQualityDto.Quantity;
        qualityItem.Usage_Level = createQualityDto.Usage_Level;
        qualityItem.Min_Quantity = createQualityDto.Min_Quantity;
        qualityItem.Max_Quantity = createQualityDto.Max_Quantity;
        await qualityItem.save();
        return qualityItem;
    }
}
