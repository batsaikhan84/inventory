import { EmailService } from './../email/email.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRdDto } from './create-rd.dto';
import { Rd } from './rd.entity';
import { RdRepository } from './rd.repository';

@Injectable()
export class RdService {
    constructor(
        @InjectRepository(RdRepository)
        private rdRepository: RdRepository,
        private emailService: EmailService
    ) {}
    @Cron('02 00 7 * * 2')
    // @Cron('48 * * * * *')
    public async scheduledRdItems() {
        const rdItemsRes = await this.rdRepository.find({relations: ['master']});
        if(!rdItemsRes) {
            throw new NotFoundException();
        };
        const scheduledItems = this.rdRepository.getRdItemsForEmail(rdItemsRes);
        if(scheduledItems.length > 0) {
            this.emailService.sendScheduledEmail(scheduledItems, 'R&D')
        }
    }
    public async rdMasterItems(): Promise<Rd[]> {
        const rdItems = await this.rdRepository.find({ relations: ['master'] })
        if(!rdItems) {
            throw new NotFoundException();
        }
        return this.rdRepository.getRdMasterItems(rdItems);
    }
    public async rdMasterItem(id: number): Promise<Rd> {
        const rdItems = await this.rdRepository.find({ relations: ['master'] })
        if(!rdItems) {
            throw new NotFoundException();
        }
        return this.rdRepository.getRdMasterItem(rdItems, id);
    }
    public async rdItems(): Promise<Rd[]> {
        const rdItems = await this.rdRepository.find({ relations: ['master'] })
        if(!rdItems) {
            throw new NotFoundException();
        }
        return rdItems;
    }
    public async rdItem(id: number): Promise<Rd> {
        const rdItem = await this.rdRepository.findOne(id);
        if(!rdItem) {
            throw new NotFoundException();
        }
        return rdItem
    }
    public async createRdItem(createRdDto: CreateRdDto): Promise<Rd> {
        return this.rdRepository.createRdItem(createRdDto);
    }
    public async deleteRdItem(id: number): Promise<void> {
        const result = await this.rdRepository.delete(id)
        if(result.affected === 0) {
            throw new NotFoundException();
        }
    }
    public async updateRdItem(id: number, createRdDto: CreateRdDto): Promise<Rd> {
        const rdItem = await this.rdItem(id)
        rdItem.ID = createRdDto.ID;
        rdItem.Item_ID = createRdDto.Item_ID;
        rdItem.Location = createRdDto.Location;
        rdItem.Quantity = createRdDto.Quantity;
        rdItem.Usage_Level = createRdDto.Usage_Level;
        rdItem.Min_Quantity = createRdDto.Min_Quantity;
        rdItem.Max_Quantity = createRdDto.Max_Quantity;
        await rdItem.save();
        return rdItem;
    }
}
