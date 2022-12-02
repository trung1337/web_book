import {IsDate, IsNotEmpty, IsOptional, IsPositive, IsString, MinLength} from "class-validator";
import {Transform} from "class-transformer";
import * as moment from 'moment';
import {ApiProperty} from "@nestjs/swagger";
export class BookDto{

}

export class BookIdDto{
    @IsNotEmpty()
    @Transform(({value})=> value && +value)
    @IsPositive()
    id: number;
}

export class CreateBookDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Transform(({value})=> value && value.trim())
    @MinLength(1)
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Transform(({value})=> value && value.trim())
    @MinLength(1)
    author: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @Transform(({value})=> value && value.trim())
    desc?: string;

    @ApiProperty({example: new Date()})
    @IsNotEmpty()
    @Transform(({value})=> moment(value).format('YYYY/MM/DD'))
    // @IsDate()
    publish: string;

    @ApiProperty()
    @IsNotEmpty()
    @Transform(({value})=> value && +value)
    @IsPositive()
    page: number;

    @ApiProperty()
    @IsOptional()
    @Transform(({value})=> value && value.trim())
    @IsString()
    category: string;

    @ApiProperty({ type: 'string', format: 'binary', required: false })
    @IsOptional()
    files?: string;

    @IsOptional()
    image?: string;
}

export class UpdateBookDto extends CreateBookDto{
    @IsOptional()
    @IsPositive()
    id?: number;
}