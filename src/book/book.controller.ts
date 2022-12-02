import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UploadedFile,
    UseFilters,
    UseInterceptors
} from '@nestjs/common';
import {BookService} from "@/book/book.service";
import {BookIdDto, CreateBookDto, UpdateBookDto} from "@/book/book.dto";
import {FileInterceptor} from "@nestjs/platform-express";
import {MulterErrorFilter} from "@/base/middleware/upload-file.filter";
import {ApiConsumes, ApiTags} from "@nestjs/swagger";

@ApiTags('Book')
@Controller('book')
export class BookController {
    constructor(
        private readonly bookService: BookService
    ) {
    }

    @Get('test')
    async import(){
        return this.bookService.import()
    }

    @Get()
    async listBook(){
        return this.bookService.list();
    }

    @Get(':id')
    async get(@Param() param: BookIdDto){
        return this.bookService.get(param.id);
    }

    @Post()
    @UseFilters(MulterErrorFilter)
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file'))
    async create(@UploadedFile() file: Express.Multer.File, @Body() dto: CreateBookDto ){
        return this.bookService.create(dto)
    }

    @Put(':id')
    @UseFilters(MulterErrorFilter)
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file'))
    async update(@Param() param: BookIdDto, @UploadedFile() file: Express.Multer.File, @Body() dto: UpdateBookDto){
        return this.bookService.update({...param, ...dto})
    }

    @Delete(':id')
    async delete(@Param() param: BookIdDto){
        return this.bookService.delete(param.id)
    }
}
