import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class CreateMaterialDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'The name of the material.',
        example: 'zinc',
        type: String,
      })
    name: string;
}

export class CreateManyMaterialsDto {
    @ValidateNested({ each: true })
    @Type(() => CreateMaterialDto)
    @ApiProperty({
        description: 'Collection of material objects.',
        type: [CreateMaterialDto],
        example: [
            { name: 'zinc' },
        ],
    })
    materials: CreateMaterialDto[];
}