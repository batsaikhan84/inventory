import { Injectable, NotFoundException } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from '../email/email.service';
import { CreateStoreRoomDto } from './create-store-room.dto';
import { StoreRoom } from './store-room.entity';
import { StoreRoomRepository } from './store-room.repository';

@Injectable()
export class StoreRoomService {
    constructor(
        @InjectRepository(StoreRoomRepository)
        private storeRoomRepository: StoreRoomRepository,
        private emailService: EmailService
    ) {}
    @Cron('01 00 7 * * 2')
    // @Cron('43 * * * * *')
    public async scheduledStoreRoomItems() {
        const extractionItemsRes = await this.storeRoomRepository.find({relations: ['master']});
        if(!extractionItemsRes) {
            throw new NotFoundException();
        };
        const scheduledItems = this.storeRoomRepository.getStoreRoomItemsForEmail(extractionItemsRes);
        if(scheduledItems.length > 0) {
            this.emailService.sendScheduledEmail(scheduledItems, 'Store Room')
        }
    }
    public async storeRoomMasterItems(): Promise<StoreRoom[]> {
        const storeRoomItems = await this.storeRoomRepository.find({ relations: ['master'] })
        if(!storeRoomItems) {
            throw new NotFoundException();
        }
        return this.storeRoomRepository.getStoreRoomMasterItems(storeRoomItems);
    }
    public async storeRoomMasterItem(id: number): Promise<StoreRoom> {
        const storeRoomItems = await this.storeRoomRepository.find({ relations: ['master'] })
        if(!storeRoomItems) {
            throw new NotFoundException();
        }
        return this.storeRoomRepository.getStoreRoomMasterItem(storeRoomItems, id);
    }
    public async storeRoomItems(): Promise<StoreRoom[]> {
        const storeRoomItemsRes = await this.storeRoomRepository.find({ relations: ['master'] });
        if(!storeRoomItemsRes) {
            throw new NotFoundException();
        }
        return storeRoomItemsRes;
    }
    public async storeRoomItem(id: number): Promise<StoreRoom> {
        const storeRoomItem = await this.storeRoomRepository.findOne(id, { relations: ['master'] });
        if(!storeRoomItem) {
            throw new NotFoundException();
        }
        return storeRoomItem
    }
    public async createStoreRoomItem(createStoreRoomDto: CreateStoreRoomDto): Promise<StoreRoom> {
        return this.storeRoomRepository.createStoreRoomItem(createStoreRoomDto);
    }
    public async deleteStoreRoomItem(id: number): Promise<void> {
        const result = await this.storeRoomRepository.delete(id)
        if(result.affected === 0) {
            throw new NotFoundException();
        }
    }
    public async deactivateItem(id: number, createMasterDto: CreateStoreRoomDto): Promise<StoreRoom> {
        const storeRoomItem = await this.storeRoomItem(id)
        storeRoomItem.Is_Active = createMasterDto.Is_Active
        await storeRoomItem.save()
        return storeRoomItem
    }
    public async updateStoreRoomItem(id: number, createStoreRoomDto: CreateStoreRoomDto): Promise<StoreRoom> {
        const storeRoomItem = await this.storeRoomItem(id)
        storeRoomItem.Item_ID = createStoreRoomDto.Item_ID;
        storeRoomItem.Location = createStoreRoomDto.Location;
        storeRoomItem.Quantity = createStoreRoomDto.Quantity;
        storeRoomItem.Usage_Level = createStoreRoomDto.Usage_Level
        storeRoomItem.Min_Quantity = createStoreRoomDto.Min_Quantity;
        storeRoomItem.Max_Quantity = createStoreRoomDto.Max_Quantity;
        storeRoomItem.Issued = null;
        storeRoomItem.Received = null;
        storeRoomItem.Is_Active = true
        await storeRoomItem.save();
        return storeRoomItem;
    }
}