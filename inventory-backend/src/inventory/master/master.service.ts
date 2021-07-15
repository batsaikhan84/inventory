import { RdRepository } from './../rd/rd.repository';
import { ScreeningRepository } from './../screening/screening.repository';
import { MassSpecRepository } from './../mass-spec/mass-spec.repository';
import { ExtractionRepository } from './../extraction/extraction.repository';
import { CreateMasterDto } from './create-master.dto';
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Master } from "./master.entity";
import { MasterRepository } from "./master.repository";
import { Extraction } from '../extraction/extraction.entity';
import { MassSpec } from '../mass-spec/mass-spec.entity';
import { Screening } from '../screening/screening.entity';
import { Receiving } from '../receiving/receving.entity';
import { Quality } from '../quality/quality.entity';
import { StoreRoom } from '../store-room/store-room.entity';
import { Departments } from '../model/departments.model';
import { Rd } from '../rd/rd.entity';
import { ReceivingRepository } from '../receiving/receiving.repository';
import { Shipping } from '../shipping/shipping.entity';
import { StoreRoomModule } from '../store-room/store-room.module';

@Injectable()
export class MasterService {
  constructor(
    @InjectRepository(MasterRepository)
    private masterRepository: MasterRepository,
    private extractionRepository: ExtractionRepository,
    private massSpecRepository: MassSpecRepository,
    private receivingRepository: ReceivingRepository,
    private screeningRepository: ScreeningRepository,
    private rdRepository: RdRepository,
  ) { }
  public async masterItems(): Promise<Master[]> {
    const masterRes = await this.masterRepository.find({ relations: ['extraction', 'massSpec', 'receiving', 'screening', 'quality', 'storeRoom', 'rd', 'chemical', 'shipping', 'departmentRequest'] });
    if (!masterRes) {
      throw new NotFoundException();
    };
    return masterRes;
  };
  public async masterChemicalItems(): Promise<Master[]> {
    const masterRes = await this.masterRepository.find({ relations: ['extraction', 'massSpec', 'receiving', 'screening', 'quality', 'storeRoom', 'rd', 'shipping', 'chemical', 'departmentRequest'] });
    if (!masterRes) {
      throw new NotFoundException();
    };
    const masterChemicalItems = masterRes.filter(masterItem => masterItem.Type === 'Chemical')
    return masterChemicalItems
  }
  public async masterExtractionItems(id: number): Promise<Extraction[]> {
    const masterItemRes = await this.masterRepository.findOne(id, { relations: ['extraction'] });
    if (!masterItemRes) {
      throw new NotFoundException();
    };
    return masterItemRes.extraction
  }
  public async masterShippingItems(id: number): Promise<Extraction[]> {
    const masterItemRes = await this.masterRepository.findOne(id, { relations: ['shipping'] });
    if (!masterItemRes) {
      throw new NotFoundException();
    };
    return masterItemRes.shipping
  }
  public async masterMassSpecItems(id: number): Promise<MassSpec[]> {
    const masterItemRes = await this.masterRepository.findOne(id, { relations: ['massSpec'] });
    if (!masterItemRes) {
      throw new NotFoundException();
    };
    return masterItemRes.massSpec
  }
  public async masterReceivingItems(id: number): Promise<Receiving[]> {
    const masterItemRes = await this.masterRepository.findOne(id, { relations: ['receiving'] });
    if (!masterItemRes) {
      throw new NotFoundException();
    };
    return masterItemRes.receiving
  }
  public async masterScreeningItems(id: number): Promise<Screening[]> {
    const masterItemRes = await this.masterRepository.findOne(id, { relations: ['screening'] });
    if (!masterItemRes) {
      throw new NotFoundException();
    };
    return masterItemRes.screening
  }
  public async masterQualityItems(id: number): Promise<Quality[]> {
    const masterItemRes = await this.masterRepository.findOne(id, { relations: ['quality'] });
    if (!masterItemRes) {
      throw new NotFoundException();
    };
    return masterItemRes.quality
  }
  public async masterRdItems(id: number): Promise<Rd[]> {
    const masterItemRes = await this.masterRepository.findOne(id, { relations: ['rd'] });
    if (!masterItemRes) {
      throw new NotFoundException();
    };
    return masterItemRes.rd
  }
  public async masterStoreRoomItems(id: number): Promise<StoreRoom[]> {
    const masterItemRes = await this.masterRepository.findOne(id, { relations: ['storeRoom'] });
    if (!masterItemRes) {
      throw new NotFoundException();
    };
    return masterItemRes.storeRoom
  }
  public async masterDepartmentRequestItems(id: number): Promise<StoreRoom[]> {
    const masterItemRes = await this.masterRepository.findOne(id, { relations: ['departmentRequest'] });
    if (!masterItemRes) {
      throw new NotFoundException();
    };
    return masterItemRes.storeRoom
  }
  public async masterItem(id: number): Promise<Master> {
    const masterItemRes = await this.masterRepository.findOne(id, { relations: ['extraction', 'massSpec', 'receiving', 'screening', 'quality', 'storeRoom', 'rd', 'shipping', 'chemical', 'departmentRequest'] });
    if (!masterItemRes) {
      throw new NotFoundException();
    };
    return masterItemRes;
  }
  public async createMasterItem(createMasterDto: CreateMasterDto, department: Departments): Promise<Master> {
    return this.masterRepository.createMasterItem(createMasterDto, department);
  }
  public async deactivateItem(id: number, createMasterDto: CreateMasterDto): Promise<Master> {
    const masterItem = await this.masterItem(id)
    masterItem.Is_Active = createMasterDto.Is_Active
    await masterItem.save()
    return masterItem
  }
  public async updateMasterItem(id: number, createMasterDto: CreateMasterDto, department: string): Promise<Master> {
    const masterItem = await this.masterItem(id)
    masterItem.Item = createMasterDto.Item;
    masterItem.Purchase_Unit = createMasterDto.Purchase_Unit;
    masterItem.Part_Number = createMasterDto.Part_Number;
    masterItem.Average_Unit_Price = createMasterDto.Average_Unit_Price;
    masterItem.Manufacturer = createMasterDto.Manufacturer
    masterItem.Recent_CN = createMasterDto.Recent_CN;
    masterItem.Recent_Vendor = createMasterDto.Recent_Vendor;
    masterItem.Fisher_CN = createMasterDto.Fisher_CN;
    masterItem.VWR_CN = createMasterDto.VWR_CN;
    masterItem.Lab_Source_CN = createMasterDto.Lab_Source_CN;
    masterItem.Next_Advance_CN = createMasterDto.Next_Advance_CN;
    masterItem.Average_Unit_Price = createMasterDto.Average_Unit_Price;
    masterItem.Category = createMasterDto.Category;
    masterItem.Comments = createMasterDto.Comments;
    masterItem.Type = createMasterDto.Type;
    masterItem.Class = createMasterDto.Class;
    masterItem.Is_Special_Request = createMasterDto.Is_Special_Request;
    await masterItem.save();
    if (department === 'extraction') {
      const extraction = new Extraction();
      extraction.master = masterItem
      await extraction.save();
    }
    if (department === 'massSpec') {
      const massSpec = new MassSpec()
      massSpec.master = masterItem
      await massSpec.save()
    }
    if (department === 'receiving') {
      const receiving = new Receiving()
      receiving.master = masterItem
      await receiving.save()
    }
    if (department === 'screening') {
      const screening = new Screening();
      screening.master = masterItem
      await screening.save();
    }
    if (department === 'quality') {
      const quality = new Quality()
      quality.master = masterItem
      await quality.save()
    }
    if (department === 'rd') {
      const rd = new Rd()
      rd.master = masterItem
      await rd.save()
    }
    if (department === 'storeRoom') {
      const storeRoom = new StoreRoom()
      storeRoom.master = masterItem
      storeRoom.Is_Active = true
      await storeRoom.save()
    }
    if (department === 'shipping') {
      const shipping = new Shipping()
      shipping.master = masterItem
      await shipping.save()
    }
    return masterItem; 
  }
};