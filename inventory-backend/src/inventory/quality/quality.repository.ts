import { CreateQualityDto } from './create-quality.dto';
import { Quality } from './quality.entity';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Quality)
export class QualityRepository extends Repository<Quality> {
    getQualityMasterItems(quality: Quality[]): Quality[] {
        let result = []
        quality.reduce((resultObj, obj) => {
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
    getQualityItemsForEmail(qualityItems: Quality[]): Quality[] {
        const itemsToBeEmailed: Quality[] = []
        this.getQualityMasterItems(qualityItems).map(qualityItem => {
            if(qualityItem.Max_Quantity && qualityItem.Min_Quantity) {
                if(qualityItem.Is_Need_To_Order && qualityItem.Order_Quantity !== 0 ) {
                    itemsToBeEmailed.push(qualityItem)
                }
            }
        })
        return itemsToBeEmailed
    }
    getQualityMasterItem(quality: Quality[], ID: number): Quality {
        return this.getQualityMasterItems(quality).filter(item => item.Item_ID)[0]
    }
    async createQualityItem(createQualityDto: CreateQualityDto) {
        const { ID, Item_ID, Location, Quantity, Min_Quantity, Max_Quantity } = createQualityDto
        const qualityItem = new Quality();
        qualityItem.ID = ID;
        qualityItem.Item_ID = Item_ID;
        qualityItem.Location = Location;
        qualityItem.Quantity = Quantity;
        qualityItem.Min_Quantity = Min_Quantity;
        qualityItem.Max_Quantity = Max_Quantity;
        await qualityItem.save();
        return qualityItem;
    }
}