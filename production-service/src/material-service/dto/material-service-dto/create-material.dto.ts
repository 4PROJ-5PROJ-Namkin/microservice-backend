import { Type } from 'class-transformer';
import { IsNotEmpty, IsObject, IsString, Validate, ValidateNested } from 'class-validator';

export class CreateMaterialDto {
    @IsNotEmpty()
    @IsString()
    name: string;
}

export class CreateManyMaterialsDto {
    @IsObject()
    @ValidateNested()
    @Type(() => CreateMaterialDto)
    materials: CreateMaterialDto[];
}