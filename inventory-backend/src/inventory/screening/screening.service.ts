import { EmailService } from './../email/email.service';
import { Screening } from './screening.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ScreeningRepository } from './screening.repository';
import { CreateScreeningDto } from './create-screening.dto';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ScreeningService {
    constructor(
        @InjectRepository(ScreeningRepository)
        private screeningRepository: ScreeningRepository,
        private emailService: EmailService
    ) {}
    @Cron('04 00 7 * * 2')
    // @Cron('44 * * * * *')
    public async scheduledScreeningItems() {
        const screeningItemsRes = await this.screeningRepository.find({relations: ['master']});
        if(!screeningItemsRes) {
            throw new NotFoundException();
        };
        const scheduledItems = this.screeningRepository.getScreeningItemsForEmail(screeningItemsRes);
        if(scheduledItems.length > 0) {
            this.emailService.sendScheduledEmail(scheduledItems, 'Screening')
        }
    }
    public async screeningMasterItems(): Promise<Screening[]> {
        const screeningItems = await this.screeningRepository.find({ relations: ['master'] })
        if(!screeningItems) {
            throw new NotFoundException();
        }
        return this.screeningRepository.getScreeningMasterItems(screeningItems);
    }
    public async screeningMasterItem(id: number): Promise<Screening> {
        const screeningItems = await this.screeningRepository.find({ relations: ['master'] })
        if(!screeningItems) {
            throw new NotFoundException();
        }
        return this.screeningRepository.getScreeningMasterItem(screeningItems, id);
    }
    public async screeningItems(): Promise<Screening[]> {
        const screeningItems = await this.screeningRepository.find({ relations: ['master'] })
        if(!screeningItems) {
            throw new NotFoundException();
        }
        return screeningItems;
    }
    public async screeningItem(id: number): Promise<Screening> {
        const screeningItem = await this.screeningRepository.findOne(id);
        if(!screeningItem) {
            throw new NotFoundException();
        }
        return screeningItem
    }
    public async createScreeningItem(createScreeningDto: CreateScreeningDto): Promise<Screening> {
        return this.screeningRepository.createScreeningItem(createScreeningDto);
    }
    public async deletescreeningItem(id: number): Promise<void> {
        const result = await this.screeningRepository.delete(id)
        if(result.affected === 0) {
            throw new NotFoundException();
        }
    }
    public async updateScreeningItem(id: number, createScreeningDto: CreateScreeningDto): Promise<Screening> {
        const screeningItem = await this.screeningItem(id)
        screeningItem.ID = createScreeningDto.ID;
        screeningItem.Item_ID = createScreeningDto.Item_ID;
        screeningItem.Location = createScreeningDto.Location;
        screeningItem.Quantity = createScreeningDto.Quantity;
        screeningItem.Usage_Level = createScreeningDto.Usage_Level;
        screeningItem.Min_Quantity = createScreeningDto.Min_Quantity;
        screeningItem.Max_Quantity = createScreeningDto.Max_Quantity;
        await screeningItem.save();
        return screeningItem;
    }
}
