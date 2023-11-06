import { PartialType } from '@nestjs/mapped-types';
import { CreateMaterialDto } from './create-material.dto';
import { IsArray, IsNumber, IsOptional, IsPositive, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateMaterialDto extends PartialType(CreateMaterialDto) {
    @IsNumber()
    @IsPositive()
    id: number;

    @IsOptional()
    @IsString()
    name?: string;
}

export class UpdateManyMaterialsDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateMaterialDto)
    materials: UpdateMaterialDto[];
}