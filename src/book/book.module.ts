import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Book} from "@/book/book.entity";
import {BookController} from "@/book/book.controller";
import {LoggingModule} from "@/base/logging/logging.module";

@Module({
  imports: [TypeOrmModule.forFeature([Book]), LoggingModule],
  providers: [BookService],
  controllers: [BookController]
})
export class BookModule {}
