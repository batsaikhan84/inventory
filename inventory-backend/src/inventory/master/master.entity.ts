import { StoreRoom } from './../store-room/store-room.entity';
import { Rd } from './../rd/rd.entity';
import { Quality } from './../quality/quality.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Extraction } from "../extraction/extraction.entity";
import { MassSpec } from "../mass-spec/mass-spec.entity";
import { Receiving } from "../receiving/receving.entity";
import { Screening } from '../screening/screening.entity';
import { Safety } from '../safety/safety.entity';
import { SpecialRequest } from '../special-request/special-request.entity';
import { Chemical } from '../chemical/chemical.entity';

@Entity({ name: 'master' })
export class Master extends BaseEntity {
    @PrimaryGeneratedColumn({name: 'id', type: 'int'})
    ID: number;
    @Column({ name: 'item', type: 'varchar', nullable: true})
    Item: string;
    @Column({name: 'purchase_unit', type: 'varchar', nullable: true})
    Purchase_Unit: string;
    @Column({name: 'manufacturer', type: 'varchar', nullable: true})
    Manufacturer: string;
    @Column({name: 'part_number', type: 'varchar', nullable: true})
    Part_Number: string;
    @Column({name: 'recent_cn', type: 'varchar', nullable: true})
    Recent_CN: string;
    @Column({name: 'recent_vendor', type: 'varchar', nullable: true})
    Recent_Vendor: string;
    @Column({name: 'fisher_cn', type: 'varchar', nullable: true})
    Fisher_CN: string;
    @Column({name: 'vwr_cn', type: 'varchar', nullable: true})
    VWR_CN: string;
    @Column({name: 'labsource_cn', type: 'varchar', nullable: true})
    Lab_Source_CN: string;
    @Column({name: 'nextadvance_cn', type: 'varchar', nullable: true})
    Next_Advance_CN: string;
    @Column({name: 'avg_unit_price', type: 'varchar', nullable: true})
    Average_Unit_Price: string;
    @Column({name: 'category', type: 'varchar', nullable: true})
    Category: string;
    @Column({name: 'comments', type: 'varchar', nullable: true})
    Comments: string;
    @Column({name: 'type', type: 'varchar', nullable: true})
    Type: string;
    @Column({name: 'class', type: 'varchar', nullable: true})
    Class: string;
    @Column({name: 'is_active', type: 'boolean', nullable: true})
    Is_Active: boolean;
    @OneToMany(type => Extraction, extraction => extraction.master, { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    extraction: Extraction[];
    @OneToMany(type => MassSpec, massSpec => massSpec.master, { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    massSpec: MassSpec[];
    @OneToMany(type => Receiving, receiving => receiving.master, { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    receiving: Receiving[];
    @OneToMany(type => Quality, quality => quality.master, { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    quality: Quality[];
    @OneToMany(type => Rd, rd => rd.master, { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    rd: Rd[];
    @OneToMany(type => Screening, screening => screening.master, { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    screening: Screening[];
    @OneToMany(type => StoreRoom, storeRoom => storeRoom.master, { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    storeRoom: StoreRoom[];
    @OneToMany(type => StoreRoom, safety => safety.master, { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    safety: Safety[];
    @OneToMany(type => SpecialRequest, specialRequest => specialRequest.master, { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    specialRequest: SpecialRequest[];
    @OneToMany(type => Chemical, chemical => chemical.master, { nullable: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    chemical: Chemical[];
}