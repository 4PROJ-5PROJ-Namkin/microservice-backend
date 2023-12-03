import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMaterialPartInformationsDto {
    @IsArray()
    @IsNotEmpty()
    @IsNumber({}, { each: true })
    @ApiProperty({
        description: 'Array of targetted part information ids to associate in the Material Part Information join table.',
        type: [Number],
        example: [10, 22, 24, 57],
    })
    partInformationIds: number[];
}