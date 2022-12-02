import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Book{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true, nullable: false})
    title: string;

    @Column({nullable: false})
    author: string;

    @Column({nullable: true})
    desc: string;

    @Column({nullable: false})
    publish: Date;

    @Column({nullable: false})
    page: number;

    @Column({nullable: true})
    category: string;

    @Column({nullable: true})
    image: string;
}