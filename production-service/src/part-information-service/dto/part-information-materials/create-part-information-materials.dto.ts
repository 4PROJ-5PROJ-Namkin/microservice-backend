import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePartInformationMaterialsDto {
    @IsArray()
    @IsNotEmpty()
    @IsNumber({}, { each: true })
    @ApiProperty({
        description: 'Array of targetted material ids to associate in the Material Part Information join table.',
        type: [Number],
        example: [1, 4, 24, 64],
    })
    materialIds: number[];
}