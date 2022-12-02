import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, unique: true})
    username: string;

    @Column({nullable: false})
    password: string;

    @Column({nullable: false, unique: true})
    email: string;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

    setPassword(password: string) {
        this.password = bcrypt.hashSync(password, 10);
    }

    comparePassword(rawPassword: string): boolean {
        const userPassword = this.password;
        return bcrypt.compareSync(rawPassword, userPassword);
    }
}