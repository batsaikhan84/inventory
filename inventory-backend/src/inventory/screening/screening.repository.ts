import { CreateScreeningDto } from './create-screening.dto';
import { Screening } from './screening.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Screening)
export class ScreeningRepository extends Repository<Screening> {
    getScreeningMasterItems(screening: Screening[]): Screening[] {
        let result = []
        screening.reduce((resultObj, obj) => {
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
    getScreeningItemsForEmail(screeningMaster: Screening[]): Screening[] {
        const itemsToBeEmailed: Screening[] = []
        this.getScreeningMasterItems(screeningMaster).map(screeningMasterItem => {
            if(screeningMasterItem.Max_Quantity && screeningMasterItem.Min_Quantity) {
                if(screeningMasterItem.Is_Need_To_Order && screeningMasterItem.Order_Quantity !== 0) {
                    itemsToBeEmailed.push(screeningMasterItem)
                }
            }
        })
        return itemsToBeEmailed
    }
    getScreeningMasterItem(screening: Screening[], id: number) {
        return this.getScreeningMasterItems(screening).filter(item => item.Item_ID === id)[0]
    }
    async createScreeningItem(createScreeningDto: CreateScreeningDto) {
        const { ID, Item_ID, Location, Quantity, Min_Quantity, Max_Quantity } = createScreeningDto
        const screeningItem = new Screening();
        screeningItem.ID = ID;
        screeningItem.Item_ID = Item_ID;
        screeningItem.Location = Location;
        screeningItem.Quantity = Quantity;
        screeningItem.Min_Quantity = Min_Quantity;
        screeningItem.Max_Quantity = Max_Quantity;
        await screeningItem.save();
        return screeningItem;
    }
}