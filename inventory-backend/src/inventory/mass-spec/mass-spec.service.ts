import { EmailService } from './../email/email.service';
import { CreateMassSpecDto } from './create-mass-spec.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MassSpec } from './mass-spec.entity';
import { MassSpecRepository } from './mass-spec.repository';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class MassSpecService {
    constructor(
        @InjectRepository(MassSpecRepository)
        private massSpecRepository: MassSpecRepository,
        private emailService: EmailService
    ) {}
    @Cron('01 00 7 * * 2')
    // @Cron('46 * * * * *')
    public async scheduledMassSpecItems() {
        const massSpecItemsRes = await this.massSpecRepository.find({relations: ['master']});
        if(!massSpecItemsRes) {
            throw new NotFoundException();
        };
        const scheduledItems = this.massSpecRepository.getMassSpecItemsForEmail(massSpecItemsRes);
        if(scheduledItems.length > 0) {
            this.emailService.sendScheduledEmail(scheduledItems, 'Mass Spec')
        } 
    }
    public async massSpecMasterItems(): Promise<MassSpec[]> {
        const massSpecItems = await this.massSpecRepository.find({ relations: ['master'] })
        if(!massSpecItems) {
            throw new NotFoundException();
        }
        return this.massSpecRepository.getMassSpecMasterItems(massSpecItems)
    }
    public async massSpecMasterItem(id: number): Promise<MassSpec> {
        const massSpecItemsRes = await this.massSpecRepository.find({relations: ['master']});
        if(!massSpecItemsRes) {
            throw new NotFoundException();
        }
        return this.massSpecRepository.getMassSpecMasterItem(massSpecItemsRes, id);
    }
    public async massSpecItems(): Promise<MassSpec[]> {
        const massSpecItems = await this.massSpecRepository.find({ relations: ['master'] })

        if(!massSpecItems) {
            throw new NotFoundException();
        }
        return massSpecItems;
    }
    public async massSpecItem(id: number): Promise<MassSpec> {
        const massSpecItem = await this.massSpecRepository.findOne(id);
        if(!massSpecItem) {
            throw new NotFoundException();
        }
        return massSpecItem
    }
    public async createMassSpecItem(createMassSpecDto: CreateMassSpecDto): Promise<MassSpec> {
        return this.massSpecRepository.createMassSpecItem(createMassSpecDto);
    }
    public async deleteItem(item_id: number): Promise<void> {
        return this.massSpecItems().then(res => {
          Promise.all(res.map(async item => {
            if(item.master.ID === item_id) {
              const result = await this.massSpecRepository.delete(item.ID)
              console.log('inside map')
              if(result.affected === 0) {
                  throw new NotFoundException();
              }
            }
          })).then(() => console.log('success')).catch(() => { throw new NotFoundException() })
        }).catch(() => {
          throw new NotFoundException();
        })
    }
    public async updateMassSpecItem(id: number, createMassSpecDto: CreateMassSpecDto): Promise<MassSpec> {
        const massSpecItem = await this.massSpecItem(id)
        massSpecItem.ID = createMassSpecDto.ID;
        massSpecItem.Item_ID = createMassSpecDto.Item_ID;
        massSpecItem.Location = createMassSpecDto.Location;
        massSpecItem.Usage_Level = createMassSpecDto.Usage_Level;
        massSpecItem.Quantity = createMassSpecDto.Quantity;
        massSpecItem.Min_Quantity = createMassSpecDto.Min_Quantity;
        massSpecItem.Max_Quantity = createMassSpecDto.Max_Quantity;
        await massSpecItem.save();
        return massSpecItem;
    }
}
