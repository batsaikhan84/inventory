import { Pipe, PipeTransform } from "@angular/core";
import { IMaster } from "../models/master.model";

@Pipe({
    name: 'chemicalFilter'
})

export class ChemicalFilterPipe implements PipeTransform {
    transform(masterItems: IMaster[], searchValue: string): IMaster[] {
        if(!masterItems || searchValue === '') {
            return masterItems
        }
        const masterKeys = masterItems[0] && Object.keys(masterItems[0])
        return masterItems.filter((masterItem: any) => 
            masterKeys.some((masterKey: string) => String(masterItem[masterKey]).toLowerCase().indexOf(searchValue.toLowerCase()) > -1)
        )
    }
}