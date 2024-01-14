import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsPositive, ValidateNested } from 'class-validator';

class PartInformationToDeleteDto {
    @IsNumber()
    @IsPositive()
    @ApiProperty({
        description: 'Id to pinpoint the part information to delete.',
        example: 17,
        type: Number
    })
    id: number;
}

export class DeletePartInformationDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PartInformationToDeleteDto)
    @ApiProperty({
        description: 'Array of part delete objects.',
        type: [PartInformationToDeleteDto],
        example: [
            { id: 9 },
        ],
    })
    partInformations: PartInformationToDeleteDto[];
}
