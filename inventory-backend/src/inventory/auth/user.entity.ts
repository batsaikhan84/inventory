import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcryptjs from 'bcryptjs'

@Entity({name: 'user'})
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username: string;
    @Column()
    password: string;
    @Column()
    role: string;
    @Column()
    department: string;
    @Column()
    name: string
    @Column()
    salt: string

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcryptjs.hash(password, this.salt);
        return hash === this.password
    }
}