import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSafetyDto } from './create-safety.dto';
import { Safety } from './safety.entity';
import { SafetyRepository } from './safety.repository';

@Injectable()
export class SafetyService {
    constructor(
        @InjectRepository(SafetyRepository)
        private safetyRepository: SafetyRepository
    ) {}
    public async safetyItemsTotal(): Promise<Safety[]> {
        const safetyItems = await this.safetyRepository.find({ relations: ['master'] })
        if(!safetyItems) {
            throw new NotFoundException();
        }
        return this.safetyRepository.getTotalQuantity(safetyItems);
    }
    public async safetyItems(): Promise<Safety[]> {
        const safetyItems = await this.safetyRepository.find({ relations: ['master'] })
        if(!safetyItems) {
            throw new NotFoundException();
        }
        return safetyItems;
    }
    public async safetyItem(id: number): Promise<Safety> {
        const safetyItem = await this.safetyRepository.findOne(id);
        if(!safetyItem) {
            throw new NotFoundException();
        }
        return safetyItem
    }
    public async createSafetyItem(createSafetyDto: CreateSafetyDto): Promise<Safety> {
        return this.safetyRepository.createSafetyItem(createSafetyDto);
    }
    public async deleteSafetyItem(id: number): Promise<void> {
        const result = await this.safetyRepository.delete(id)
        if(result.affected === 0) {
            throw new NotFoundException();
        }
    }
    public async updateSafetyItem(id: number, createReceivingDto: CreateSafetyDto): Promise<Safety> {
        const safetyItem = await this.safetyItem(id)
        safetyItem.ID = createReceivingDto.ID;
        safetyItem.Item = createReceivingDto.Item;
        safetyItem.Location = createReceivingDto.Location;
        safetyItem.Quantity = createReceivingDto.Quantity;
        safetyItem.Usage_Level = createReceivingDto.Usage_Level
        safetyItem.Min_Quantity = createReceivingDto.Min_Quantity;
        safetyItem.Max_Quantity = createReceivingDto.Max_Quantity;
        await safetyItem.save();
        return safetyItem;
    }
}
