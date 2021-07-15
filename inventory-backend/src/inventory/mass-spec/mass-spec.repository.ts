import { CreateMassSpecDto } from './create-mass-spec.dto';
import { MassSpec } from './mass-spec.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(MassSpec)
export class MassSpecRepository extends Repository<MassSpec> {
    getMassSpecMasterItems(massSpec: MassSpec[]): MassSpec[] {
        let result = []
        massSpec.reduce((resultObj, obj) => {
            if(!resultObj[obj.Item_ID]) {
                resultObj[obj.Item_ID] = { ...obj, 
                    Quantity: 0, 
                    Item: obj.master.Item, 
                    Purchase_Unit: obj.master.Purchase_Unit, 
                    Recent_CN: obj.master.Recent_CN,
                    Comments: obj.master.Comments,
                    Part_Number: obj.master.Part_Number,
                    Category: obj.master.Category,
                    Class: obj.master.Class
                }
                result.push(resultObj[obj.Item_ID])
            }
            resultObj[obj.Item_ID].Quantity += obj.Quantity;
            return resultObj
        }, {})
        const newResult = result.map(item => ({
            ...item,
            Is_Need_To_Order: item.Min_Quantity >= item.Quantity,
            Order_Quantity: item.Max_Quantity - item.Quantity
        }))
        return newResult
    }
    getMassSpecItemsForEmail(massSpecMaster: MassSpec[]): MassSpec[] {
        const itemsToBeEmailed: MassSpec[] = []
        this.getMassSpecMasterItems(massSpecMaster).map(massSpecMasterItem => {
            if(massSpecMasterItem.Max_Quantity && massSpecMasterItem.Min_Quantity) {
                if(massSpecMasterItem.Is_Need_To_Order&& massSpecMasterItem.Order_Quantity !== 0) {
                    itemsToBeEmailed.push(massSpecMasterItem)
                }
            }
        })
        return itemsToBeEmailed
    }
    getMassSpecMasterItem(massSpec: MassSpec[], id: number): MassSpec {
        return this.getMassSpecMasterItems(massSpec).filter(item => item.Item_ID === id)[0]

    }
    async createMassSpecItem(createMassSpecDto: CreateMassSpecDto) {
        const { ID, Item_ID, Location, Quantity, Min_Quantity, Max_Quantity } = createMassSpecDto
        const massSpecItem = new MassSpec();
        massSpecItem.ID = ID;
        massSpecItem.Item_ID = Item_ID;
        massSpecItem.Location = Location;
        massSpecItem.Quantity = Quantity;
        massSpecItem.Min_Quantity = Min_Quantity;
        massSpecItem.Max_Quantity = Max_Quantity;
        await massSpecItem.save();
        return massSpecItem;
    }
}