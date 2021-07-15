import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({name: 'password_reset'})
export class Reset extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    reset_token: string;
}