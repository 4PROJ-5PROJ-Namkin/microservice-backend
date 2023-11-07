import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { IsLooseDateString } from 'src/utils/date';

export class CreateMaterialPriceDto {
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsString()
    @IsNotEmpty()
    @IsLooseDateString({
        message: 'Date must be a valid date string.'
    })
    date: string;
}

export class CreateManyMaterialPricesDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateMaterialPriceDto)
    prices: CreateMaterialPriceDto[];
}