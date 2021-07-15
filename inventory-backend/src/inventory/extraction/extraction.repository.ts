import { Extraction } from './extraction.entity';
import { EntityRepository, Repository } from "typeorm";
import { CreateExtractionDto } from './create-extraction.dto';

@EntityRepository(Extraction)
export class ExtractionRepository extends Repository<Extraction> {
    getExtractionMasterItems(extraction: Extraction[]): Extraction[] {
        let result = []
        extraction.reduce((resultObj, obj) => {
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
    getExtractionItemsForEmail(extractionMaster: Extraction[]): Extraction[] {
        const itemsToBeEmailed: Extraction[] = []
        this.getExtractionMasterItems(extractionMaster).map(extractionMasterItem => {
            if(extractionMasterItem.Max_Quantity && extractionMasterItem.Min_Quantity) {
                if(extractionMasterItem.Is_Need_To_Order && extractionMasterItem.Order_Quantity !== 0) {
                    itemsToBeEmailed.push(extractionMasterItem)
                }
            }
        })
        return itemsToBeEmailed
    }
    getTotalItem(extraction: Extraction[], id: number): Extraction {
        return this.getExtractionMasterItems(extraction).filter(item => item.Item_ID === id)[0]
    }
    async createExtractionItem(createExtractionDto: CreateExtractionDto) {
        const { ID, Item_ID, Location, Quantity, Min_Quantity, Max_Quantity } = createExtractionDto
        const extractionItem = new Extraction();
        extractionItem.ID = ID;
        extractionItem.Item_ID = Item_ID;
        extractionItem.Location = Location;
        extractionItem.Quantity = Quantity;
        extractionItem.Min_Quantity = Min_Quantity;
        extractionItem.Max_Quantity = Max_Quantity;
        await extractionItem.save();
        return extractionItem;
    }
}