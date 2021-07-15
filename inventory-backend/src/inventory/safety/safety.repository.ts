import { EntityRepository, Repository } from "typeorm";
import { CreateSafetyDto } from "./create-safety.dto";
import { Safety } from "./safety.entity";

@EntityRepository(Safety)
export class SafetyRepository extends Repository<Safety> {
    getTotalQuantity(safety: Safety[]): Safety[] {
        let result = []
        safety.reduce((resultObj, obj) => {
            if(!resultObj[obj.Item]) {
                resultObj[obj.Item] = { ...obj, 
                    Quantity: 0, 
                    Item: obj.master.Item, 
                    Purchase_Unit: obj.master.Purchase_Unit, 
                    Recent_CN: obj.master.Recent_CN,
                    Comments: obj.master.Comments,
                    Part_Number: obj.master.Part_Number
                }
                result.push(resultObj[obj.Item])
            }
            resultObj[obj.Item].Quantity += obj.Quantity;
            return resultObj
        }, {})
        return result
    }
    async createSafetyItem(createSafetyDto: CreateSafetyDto) {
        const { ID, Item, Location, Quantity, Min_Quantity, Max_Quantity } = createSafetyDto
        const safetyItem = new Safety();
        safetyItem.ID = ID;
        safetyItem.Item = Item;
        safetyItem.Location = Location;
        safetyItem.Quantity = Quantity;
        safetyItem.Min_Quantity = Min_Quantity;
        safetyItem.Max_Quantity = Max_Quantity;
        await safetyItem.save();
        return safetyItem;
    }
}