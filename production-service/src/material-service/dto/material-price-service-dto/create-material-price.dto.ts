import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMaterialPriceDto {
    @IsNotEmpty()
    materialId: number;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsString()
    @IsNotEmpty()
    date: string;
}