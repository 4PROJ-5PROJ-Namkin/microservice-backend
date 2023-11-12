import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { IsLooseDateString } from 'src/utils/date';

export class CreateMaterialPriceDto {
    @IsNumber(
        { allowNaN: false, allowInfinity: false },
        { message: 'Price must be a floating point number' }
    )
    @IsNotEmpty()
    @ApiProperty({
        description: 'Price of a given material.',
        example: 110.50,
        type: Number
    })
    price: number;

    @IsString()
    @IsNotEmpty()
    @IsLooseDateString({
        message: 'Date must be a valid date string.'
    })
    @ApiProperty({
        description: 'Date of material price attribution.',
        example: "15/02/2020",
        type: String
    })
    date: string;
}

export class CreateManyMaterialPricesDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateMaterialPriceDto)
    @ApiProperty({
        description: 'Collection of material prices objects.',
        type: [CreateMaterialPriceDto],
        example: [
            { price: 58.75, date: "10/10/2022" },
        ],
    })
    prices: CreateMaterialPriceDto[];
}

function IsFloat(): (target: CreateMaterialPriceDto, propertyKey: "price") => void {
    throw new Error('Function not implemented.');
}
