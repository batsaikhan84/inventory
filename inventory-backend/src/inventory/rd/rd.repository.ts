import { CreateRdDto } from './create-rd.dto';
import { Rd } from './rd.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Rd)
export class RdRepository extends Repository<Rd> {
    getRdMasterItems(rd: Rd[]): Rd[] {
        let result = []
        rd.reduce((resultObj, obj) => {
            if(!resultObj[obj.Item_ID]) {
                resultObj[obj.Item_ID] = { ...obj, 
                    Quantity: 0, 
                    Item: obj.master.Item, 
                    Purchase_Unit: obj.master.Purchase_Unit, 
                    Recent_CN: obj.master.Recent_CN,
                    Comments: obj.master.Comments,
                    Part_Number: obj.master.Part_Number
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
    getRdItemsForEmail(rdMaster: Rd[]): Rd[] {
        const itemsToBeEmailed: Rd[] = []
        this.getRdMasterItems(rdMaster).map(rdMasterItem => {
            if(rdMasterItem.Max_Quantity && rdMasterItem.Min_Quantity) {
                if(rdMasterItem.Is_Need_To_Order && rdMasterItem.Order_Quantity !== 0) {
                    itemsToBeEmailed.push(rdMasterItem)
                }
            }
        })
        return itemsToBeEmailed
    }
    getRdMasterItem(rd: Rd[], id: number): Rd {
        return this.getRdMasterItems(rd).filter(item => item.Item_ID)[0]
    }
    async createRdItem(createRdDto: CreateRdDto) {
        const { ID, Item_ID, Location, Quantity, Min_Quantity, Max_Quantity } = createRdDto
        const rdItem = new Rd();
        rdItem.ID = ID;
        rdItem.Item_ID = Item_ID;
        rdItem.Location = Location;
        rdItem.Quantity = Quantity;
        rdItem.Min_Quantity = Min_Quantity;
        rdItem.Max_Quantity = Max_Quantity;
        await rdItem.save();
        return rdItem;
    }
}