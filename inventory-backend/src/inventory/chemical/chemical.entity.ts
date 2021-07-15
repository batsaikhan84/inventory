import { Master } from "../master/master.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'chemical' })
export class Chemical extends BaseEntity {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
    ID: number;
    @Column({ name: 'cas', type: 'varchar', nullable: true })
    CAS: string;
    @Column({ name: 'physical_state', type: 'varchar', nullable: true })
    Physical_State: string;
    @Column({ name: 'container_size', type: 'varchar', nullable: true })
    Container_Size: string;
    @Column({ name: 'health_hr', type: 'int', nullable: true })
    Health_Hr: number;
    @Column({ name: 'fire_hr', type: 'int', nullable: true })
    Fire_Hr: number;
    @Column({ name: 'special_hr', type: 'int', nullable: true })
    Special_Hr: number;
    @Column({ name: 'special_notes', type: 'varchar', nullable: true })
    Special_Notes: string;
    @Column({ name: 'item_id', type: 'int', nullable: true })
    Item_ID: number;
    @ManyToOne(type => Master, master => master.chemical, { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'item_id' })
    master: Master
}