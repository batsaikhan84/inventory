import { CreateReceivingDto } from './create-receiving.dto';
import { Receiving } from './receving.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Receiving)
export class ReceivingRepository extends Repository<Receiving> {
    getReceivingMasterItems(receiving: Receiving[]): Receiving[] {
        let result = []
        receiving.reduce((resultObj, obj) => {
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
    getReceivingItemsForEmail(receivingMaster: Receiving[]): Receiving[] {
        const itemsToBeEmailed: Receiving[] = []
        this.getReceivingMasterItems(receivingMaster).map(receivingMasterItem => {
            if(receivingMasterItem.Max_Quantity && receivingMasterItem.Min_Quantity) {
                if(receivingMasterItem.Is_Need_To_Order && receivingMasterItem.Order_Quantity !== 0) {
                    itemsToBeEmailed.push(receivingMasterItem)
                }
            }
        })
        return itemsToBeEmailed
    }
    getReceivingMasterItem(receiving: Receiving[], id: number): Receiving {
        return this.getReceivingMasterItems(receiving).filter(item => item.Item_ID === id)[0]
    }
    async createReceivingItem(createReceivingDto: CreateReceivingDto) {
        const { ID, Item_ID, Location, Quantity, Min_Quantity, Max_Quantity } = createReceivingDto
        const receivingItem = new Receiving();
        receivingItem.ID = ID;
        receivingItem.Item_ID = Item_ID;
        receivingItem.Location = Location;
        receivingItem.Quantity = Quantity;
        receivingItem.Min_Quantity = Min_Quantity;
        receivingItem.Max_Quantity = Max_Quantity;
        await receivingItem.save();
        return receivingItem;
    }
}