import { Rd } from './../rd/rd.entity';
import { EntityRepository, Repository } from "typeorm";
import { Extraction } from "../extraction/extraction.entity";
import { MassSpec } from "../mass-spec/mass-spec.entity";
import { Departments } from "../model/departments.model";
import { Quality } from "../quality/quality.entity";
import { Receiving } from "../receiving/receving.entity";
import { Screening } from "../screening/screening.entity";
import { StoreRoom } from "../store-room/store-room.entity";
import { CreateMasterDto } from "./create-master.dto";
import { Master } from "./master.entity";
import { CreateChemicalDto } from '../chemical/create-chemical-dto';

@EntityRepository(Master)
export class MasterRepository extends Repository<Master> {
    checkDupliacte(createChemicalDto: CreateChemicalDto) {
        
    }
    async createMasterItem(createMasterDto: CreateMasterDto, departments: Departments) {
        const { Item, Purchase_Unit, Manufacturer, Part_Number, Recent_CN, Recent_Vendor, Fisher_CN, VWR_CN, Lab_Source_CN, Next_Advance_CN, Average_Unit_Price, Category, Comments, Type, Class } = createMasterDto
        const masterItem = new Master();
        masterItem.Item = Item;
        masterItem.Purchase_Unit = Purchase_Unit;
        masterItem.Part_Number = Part_Number;
        masterItem.Manufacturer = Manufacturer;
        masterItem.Average_Unit_Price = Average_Unit_Price;
        masterItem.Recent_CN = Recent_CN;
        masterItem.Recent_Vendor = Recent_Vendor;
        masterItem.Fisher_CN = Fisher_CN;
        masterItem.VWR_CN = VWR_CN;
        masterItem.Lab_Source_CN = Lab_Source_CN;
        masterItem.Next_Advance_CN = Next_Advance_CN;
        masterItem.Average_Unit_Price = Average_Unit_Price;
        masterItem.Category = Category;
        masterItem.Comments = Comments;
        masterItem.Type = Type;
        masterItem.Class = Class;
        masterItem.Is_Active = true
        await masterItem.save();
        if (departments.extraction) {
            const extraction = new Extraction();
            extraction.master = masterItem
            await extraction.save();
        }
        if (departments.massSpec) {
            const massSpec = new MassSpec()
            massSpec.master = masterItem
            await massSpec.save()
        }
        if (departments.receiving) {
            const receiving = new Receiving()
            receiving.master = masterItem
            await receiving.save()
        }
        if (departments.screening) {
            const screening = new Screening();
            screening.master = masterItem
            await screening.save();
        }
        if (departments.quality) {
            const quality = new Quality()
            quality.master = masterItem
            await quality.save()
        }
        if (departments.rd) {
            const rd = new Rd()
            rd.master = masterItem
            await rd.save()
        }
        if (departments.storeRoom) {
            const storeRoom = new StoreRoom()
            storeRoom.master = masterItem
            await storeRoom.save()
        }
        return masterItem;
    }
}