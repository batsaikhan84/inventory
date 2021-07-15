import { CreateChemicalDto } from './create-chemical-dto';
import { EntityRepository, Repository } from "typeorm";
import { Chemical } from "./chemical.entity";

@EntityRepository(Chemical)
export class ChemicalRepository extends Repository<Chemical> {
    getChemicalItems(chemicalItems: CreateChemicalDto[]) {
        chemicalItems.map(chemicalItem => ({
            ...chemicalItem,
        }))
    }
}