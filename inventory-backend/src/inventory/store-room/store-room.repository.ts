import { EntityRepository, Repository } from "typeorm";
import { CreateStoreRoomDto } from "./create-store-room.dto";
import { StoreRoom } from "./store-room.entity";

@EntityRepository(StoreRoom)
export class StoreRoomRepository extends Repository<StoreRoom> {
    getStoreRoomMasterItems(screening: StoreRoom[]): StoreRoom[] {
        const result: any = screening.map(screeingMasterItem => ({
            ...screeingMasterItem,
            Item: screeingMasterItem.master.Item, 
            Purchase_Unit: screeingMasterItem.master.Purchase_Unit, 
            Recent_CN: screeingMasterItem.master.Recent_CN,
            Comments: screeingMasterItem.master.Comments, 
            Part_Number: screeingMasterItem.master.Part_Number 
        }))
        const newResult: StoreRoom[] = result.map(item => ({
            ...item,
            Is_Need_To_Order: item.Min_Quantity >= item.Quantity,
            Order_Quantity: item.Max_Quantity - item.Quantity
        }))
        return newResult
    }
    getStoreRoomItemsForEmail(extractionMaster: StoreRoom[]): StoreRoom[] {
        const itemsToBeEmailed: StoreRoom[] = []
        this.getStoreRoomMasterItems(extractionMaster).map(extractionMasterItem => {
            if(extractionMasterItem.Max_Quantity && extractionMasterItem.Min_Quantity) {
                if(extractionMasterItem.Is_Need_To_Order && extractionMasterItem.Order_Quantity !== 0) {
                    itemsToBeEmailed.push(extractionMasterItem)
                }
            }
        })
        return itemsToBeEmailed
    }
    getStoreRoomMasterItem(storeRoom: StoreRoom[], id: number): StoreRoom {
        return this.getStoreRoomMasterItems(storeRoom).filter(item => item.Item_ID === id)[0]
    }
    async createStoreRoomItem(createStoreRoomDto: CreateStoreRoomDto) {
        const { ID, Item_ID, Location, Quantity, Min_Quantity, Max_Quantity, Usage_Level, Issued, Received } = createStoreRoomDto
        const storeRoomItem = new StoreRoom();
        storeRoomItem.ID = ID;
        storeRoomItem.Item_ID = Item_ID;
        storeRoomItem.Location = Location;
        storeRoomItem.Quantity = Quantity;
        storeRoomItem.Min_Quantity = Min_Quantity;
        storeRoomItem.Max_Quantity = Max_Quantity;
        storeRoomItem.Usage_Level = Usage_Level;
        storeRoomItem.Issued = Issued;
        storeRoomItem.Received = Received;
        await storeRoomItem.save();
        return storeRoomItem;
    }
}