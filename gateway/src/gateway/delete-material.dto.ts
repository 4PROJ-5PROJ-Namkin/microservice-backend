import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsPositive, ValidateNested } from 'class-validator';

class MaterialToDeleteDto {
    @IsNumber()
    @IsPositive()
    @ApiProperty({
        description: 'Id to pinpoint the material to delete.',
        example: 12,
        type: Number,
    })
    id: number;
}

export class DeleteManyMaterialsDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => MaterialToDeleteDto)
    @ApiProperty({
        description: 'Array of material delete objects.',
        type: [MaterialToDeleteDto],
        example: [
            { id: 1 },
        ],
    })
    materials: MaterialToDeleteDto[];
}
