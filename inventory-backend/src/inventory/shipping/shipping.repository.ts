import { EntityRepository, Repository } from "typeorm";
import { CreateShippingDto } from "./create-shipping.dto";
import { Shipping } from "./shipping.entity";


@EntityRepository(Shipping)
export class ShippingRepository extends Repository<Shipping> {
    getShippingMasterItems(shipping: Shipping[]): Shipping[] {
        let result = []
        shipping.reduce((resultObj, obj) => {
            if(!resultObj[obj.Item_ID]) {
                resultObj[obj.Item_ID] = { ...obj, 
                    Quantity: 0, 
                    Item: obj.master.Item, 
                    Purchase_Unit: obj.master.Purchase_Unit, 
                    Recent_CN: obj.master.Recent_CN,
                    Comments: obj.master.Comments,
                    Part_Number: obj.master.Part_Number,
                    Is_Active: obj.master.Is_Active
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
    getItemsForEmail(shippingMaster: Shipping[]): Shipping[] {
        const itemsToBeEmailed: Shipping[] = []
        this.getShippingMasterItems(shippingMaster).map(shippingMasterItem => {
            if(shippingMasterItem.Max_Quantity && shippingMasterItem.Min_Quantity) {
                if(shippingMasterItem.Is_Need_To_Order && shippingMasterItem.Order_Quantity !== 0) {
                    itemsToBeEmailed.push(shippingMasterItem)
                }
            }
        })
        return itemsToBeEmailed
    }
    getTotalItem(Shipping: Shipping[], id: number): Shipping {
        return this.getShippingMasterItems(Shipping).filter(item => item.Item_ID === id)[0]
    }
    async createShippingItem(createShippingDto: CreateShippingDto) {
        const { ID, Item_ID, Location, Quantity, Min_Quantity, Max_Quantity } = createShippingDto
        const shippingItem = new Shipping();
        shippingItem.ID = ID;
        shippingItem.Item_ID = Item_ID;
        shippingItem.Location = Location;
        shippingItem.Quantity = Quantity;
        shippingItem.Min_Quantity = Min_Quantity;
        shippingItem.Max_Quantity = Max_Quantity;
        await shippingItem.save();
        return shippingItem;
    }
}