import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from '../email/email.service';
import { MasterRepository } from '../master/master.repository';
import { CreateSpecialRequestDto } from './create-special-request.dto';
import { SpecialRequest } from './special-request.entity';
import { SpecialRequestRepository } from './special.request.repository';

@Injectable()
export class SpecialRequestService {
    constructor(
        @InjectRepository(SpecialRequestRepository)
        private specialRequestRepository: SpecialRequestRepository,
    ) {}
    public async specialRequestItems(): Promise<SpecialRequest[]> {
        const specialRequestItems = await this.specialRequestRepository.find({ relations: ['master'] })
        if(!specialRequestItems) {
            throw new NotFoundException();
        }
        return specialRequestItems;
    }
    public async specialRequestItem(id: number): Promise<SpecialRequest> {
        const specialRequestItem = await this.specialRequestRepository.findOne(id, { relations: ['master'] });
        if(!specialRequestItem) {
            throw new NotFoundException();
        }
        return specialRequestItem
    }
    public async createSpecialRequestItem(createSpecialRequestDto: CreateSpecialRequestDto): Promise<SpecialRequest> {
        return this.specialRequestRepository.createSpecialRequestItem(createSpecialRequestDto);
    }
    public async deleteSpecialRequestItem(id: number): Promise<void> {
        const result = await this.specialRequestRepository.delete(id)
        if(result.affected === 0) {
            throw new NotFoundException();
        }
    }
    public async updateSpecialRequestItem(id: number, createSpecialRequestDto: CreateSpecialRequestDto): Promise<SpecialRequest> {
        const specialRequestItem = await this.specialRequestItem(id)
        specialRequestItem.Quantity = createSpecialRequestDto.Quantity;
        specialRequestItem.Department = createSpecialRequestDto.Department;
        specialRequestItem.Status = createSpecialRequestDto.Status;
        specialRequestItem.Time_Updated = new Date();
        specialRequestItem.Is_Confirmed = createSpecialRequestDto.Is_Confirmed
        specialRequestItem.User = createSpecialRequestDto.User
        await specialRequestItem.save();
        return specialRequestItem
    }
}
