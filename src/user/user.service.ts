import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Repository} from "typeorm";
import {LoginDto, RegisterDto} from "./user.dto";
import * as exc from '@/base/api/exception.reslover';

export interface IUserGetByUniqueKey {
    username?: string;
    email?: string;
}


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>,
    ) {}

    getUserByUniqueKey(option: IUserGetByUniqueKey): Promise<User> {
        const findOption: Record<string, any>[] = Object.entries(option).map(([key, value]) => ({ [key]: value }));
        return this.repository.createQueryBuilder('user')
            .where(findOption)
            .getOne();
    }

    async login(dto: LoginDto): Promise<any> {
        const { username, password } = dto;
        const user = await this.getUserByUniqueKey({ username });
        if (!user || !user.comparePassword(password))
            throw new exc.BadRequest({ message: 'username or password does not exists' });

        return user;
    }

    async register(dto: RegisterDto){
        let isExists = await this.getUserByUniqueKey({email: dto.email});
        if(isExists) throw new exc.BadRequest({message: 'email already is use'});
        isExists = await this.getUserByUniqueKey({username: dto.username})
        if(isExists) throw new exc.BadRequest({message: 'username already is use'});

        const user = this.repository.create(dto);
        user.setPassword(dto.password);
        return this.repository.save(user);
    }
}
