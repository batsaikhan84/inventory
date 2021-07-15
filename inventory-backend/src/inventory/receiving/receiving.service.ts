import { EmailService } from './../email/email.service';
import { CreateReceivingDto } from './create-receiving.dto';
import { Receiving } from './receving.entity';
import { ReceivingRepository } from './receiving.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ReceivingService {
  constructor(
    @InjectRepository(ReceivingRepository)
    private recevingRepository: ReceivingRepository,
    private emailService: EmailService
  ) { }
  @Cron('03 00 7 * * 2')
  // @Cron('49 * * * * *')
  public async scheduledReceivingItems() {
    const receivingItemsRes = await this.recevingRepository.find({ relations: ['master'] });
    if (!receivingItemsRes) {
      throw new NotFoundException();
    };
    const scheduledItems = this.recevingRepository.getReceivingItemsForEmail(receivingItemsRes);
    if (scheduledItems.length > 0) {
      this.emailService.sendScheduledEmail(scheduledItems, 'Receiving')
    }
  }
  public async receivingMasterItems(): Promise<Receiving[]> {
    const receivingItems = await this.recevingRepository.find({ relations: ['master'] })
    if (!receivingItems) {
      throw new NotFoundException();
    }
    return this.recevingRepository.getReceivingMasterItems(receivingItems);
  }
  public async receivingMasterItem(id: number): Promise<Receiving> {
    const receivingItems = await this.recevingRepository.find({ relations: ['master'] })
    if (!receivingItems) {
      throw new NotFoundException();
    }
    return this.recevingRepository.getReceivingMasterItem(receivingItems, id);
  }
  public async receivingItems(): Promise<Receiving[]> {
    const receivingItems = await this.recevingRepository.find({ relations: ['master'] })
    if (!receivingItems) {
      throw new NotFoundException();
    }
    return receivingItems;
  }
  public async receivingItem(id: number): Promise<Receiving> {
    const receivingItem = await this.recevingRepository.findOne(id, { relations: ['master'] });
    if (!receivingItem) {
      throw new NotFoundException();
    }
    return receivingItem
  }
  public async createReceivingItem(createReceivingDto: CreateReceivingDto): Promise<Receiving> {
    return this.recevingRepository.createReceivingItem(createReceivingDto);
  }
  public async deleteItem(item_id: number): Promise<void> {
    return this.receivingItems().then(res => {
      res.map(async item => {
        if (item.master.ID === item_id) {
          const result = await this.recevingRepository.delete(item.ID)
          if (result.affected === 0) {
            throw new NotFoundException();
          }
        }
      })
    }).catch(() => {
      throw new NotFoundException();
    })
  }
  public async updateReceivingItem(id: number, createReceivingDto: CreateReceivingDto): Promise<Receiving> {
    const receivingItem = await this.receivingItem(id)
    receivingItem.Item_ID = createReceivingDto.Item_ID;
    receivingItem.Location = createReceivingDto.Location;
    receivingItem.Quantity = createReceivingDto.Quantity;
    receivingItem.Usage_Level = createReceivingDto.Usage_Level;
    receivingItem.Min_Quantity = createReceivingDto.Min_Quantity;
    receivingItem.Max_Quantity = createReceivingDto.Max_Quantity;
    await receivingItem.save();
    return receivingItem;
  }
}
