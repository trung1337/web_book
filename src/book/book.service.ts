import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Book} from "@/book/book.entity";
import {Repository} from "typeorm";
import * as exc from '@/base/api/exception.reslover'
import {CreateBookDto, UpdateBookDto} from "@/book/book.dto";

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book)
        private readonly repository: Repository<Book>
    ) {
    }

    async import(){
        for(let i = 1; i< 100; i++){
            await this.repository.save({
                title: 'truyen kieu '+ i,
                author: 'nguyen du',
                publish: new Date(),
                page: i,
            });
        }
    }

    async list(){
        return this.repository.find();
    }

    async get(id: number){
        const book = await this.repository.findOne({where: {id}})
        if(!book) throw new exc.BadRequest({message: 'id book does not exist'})
        return book;
    }

    async create(dto: CreateBookDto){
        try {
            const book = await this.repository.findOne({where: {title: dto.title}})
            if(book) throw new exc.BadRequest({message: 'title book already is use'})
            await this.repository.save(dto);
        } catch (e) {
            throw new exc.BadRequest({message: e.message})
        }
    }

    async update(dto: UpdateBookDto){
        try {
            await this.repository.update(dto.id, {...dto});
        } catch (e) {
            throw new exc.BadRequest({message: e.message})
        }
    }

    async delete(id: number){
        const book = await this.repository.findOne({where: {id}})
        if(!book) throw new exc.BadRequest({message: 'book does not exist'})
        await this.repository.delete(id);
        return true;
    }
}
