import { EntityRepository, Repository } from "typeorm";
import { CreateResetDto } from "./create-reset.dto";
import { Reset } from "./reset.entity";

@EntityRepository(Reset)
export class ResetRepository extends Repository<Reset> {
    async createResetToken(resetToken: string) {
        const reset = new Reset()
        reset.reset_token = resetToken
        try {
            await reset.save()
        } catch(error) {
            console.log(error)
        }
    } 
 }