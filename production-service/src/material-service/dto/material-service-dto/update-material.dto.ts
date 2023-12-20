import { PartialType } from '@nestjs/mapped-types';
import { CreateMaterialDto } from './create-material.dto';
import { IsArray, IsNumber, IsOptional, IsPositive, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMaterialDto extends PartialType(CreateMaterialDto) {
    @IsNumber()
    @IsPositive()
    @ApiProperty({
        description: 'Id to pinpoint the material to update.',
        example: 12,
        type: Number,
    })
    id: number;

    @IsOptional()
    @IsString()
    @ApiProperty({
        description: 'The name of the material.',
        example: "zinc",
        type: String,
    })
    name?: string;
}

export class UpdateManyMaterialsDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateMaterialDto)
    @ApiProperty({
        description: 'Array of material update objects.',
        type: [UpdateMaterialDto],
        example: [
            { id: 1, name: 'zinc' },
        ],
    })
    materials: UpdateMaterialDto[];
}