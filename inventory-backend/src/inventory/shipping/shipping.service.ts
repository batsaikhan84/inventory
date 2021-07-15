import { Injectable, NotFoundException  } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from '../email/email.service';
import { Cron } from '@nestjs/schedule';
import { ShippingRepository } from './shipping.repository';
import { Shipping } from './shipping.entity';
import { CreateShippingDto } from './create-shipping.dto';

@Injectable()
export class ShippingService {
    constructor(
        @InjectRepository(ShippingRepository)
        private shippingRepository: ShippingRepository,
        private emailService: EmailService
    ) {}
    @Cron('01 00 7 * * 2')
    // @Cron('46 * * * * *')
    public async scheduledItems() {
        const itemsRes = await this.shippingRepository.find({relations: ['master']});
        if(!itemsRes) {
            throw new NotFoundException();
        };
        const scheduledItems = this.shippingRepository.getItemsForEmail(itemsRes);
        if(scheduledItems.length > 0) {
            this.emailService.sendScheduledEmail(scheduledItems, 'Shipping')
        }
    }
    public async shippingItems(): Promise<Shipping[]> {
        const ShippingItemsRes = await this.shippingRepository.find({relations: ['master']});
        if(!ShippingItemsRes) {
            throw new NotFoundException();
        };
        return ShippingItemsRes;
    }
    public async shippingItem(id: number): Promise<Shipping> {
        const ShippingItem = await this.shippingRepository.findOne(id, {relations: ['master']});
        if(!ShippingItem) {
            throw new NotFoundException();
        }
        return ShippingItem
    }
    public async shippingMasterItems(): Promise<Shipping[]> {
        const ShippingItemsRes = await this.shippingRepository.find({relations: ['master']});
        if(!ShippingItemsRes) {
            throw new NotFoundException();
        };
        return this.shippingRepository.getShippingMasterItems(ShippingItemsRes);
    };
    public async shippingMasterItem(id: number): Promise<Shipping> {
        const ShippingItemsRes = await this.shippingRepository.find({relations: ['master']});
        if(!ShippingItemsRes) {
            throw new NotFoundException();
        }
        return this.shippingRepository.getTotalItem(ShippingItemsRes, id);
    }
    public async createShippingItem(createShippingDto: CreateShippingDto): Promise<Shipping> {
        return this.shippingRepository.createShippingItem(createShippingDto);
    }
    public async deleteItem(item_id: number): Promise<void> {
      return this.shippingItems().then(res => {
        Promise.all(res.map(async item => {
          if(item.master.ID === item_id) {
            const result = await this.shippingRepository.delete(item.ID)
            if(result.affected === 0) {
                throw new NotFoundException();
            }
          }
        })).then(() => console.log('success')).catch(() => { throw new NotFoundException() })
      }).catch(() => {
        throw new NotFoundException();
      })
    }
    public async updateShippingItem(id: number, createShippingDto: CreateShippingDto): Promise<Shipping> {
        const shippingItem = await this.shippingItem(id)
        shippingItem.ID = createShippingDto.ID;
        shippingItem.Item_ID = createShippingDto.Item_ID;
        shippingItem.Location = createShippingDto.Location;
        shippingItem.Quantity = createShippingDto.Quantity;
        shippingItem.Usage_Level = createShippingDto.Usage_Level;
        shippingItem.Min_Quantity = createShippingDto.Min_Quantity;
        shippingItem.Max_Quantity = createShippingDto.Max_Quantity;
        await shippingItem.save();
        return shippingItem;
    }
}
