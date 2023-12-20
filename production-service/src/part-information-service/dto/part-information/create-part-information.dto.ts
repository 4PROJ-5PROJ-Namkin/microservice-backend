import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, Min, IsNotEmpty, ValidateNested } from 'class-validator';

export class CreatePartInformationDto {
    @IsNumber(
        { allowNaN: false, allowInfinity: false },
        { message: 'Price must be a floating point number' }
    )
    @Min(0, { message: 'The default price must be a non-negative number.' })
    @ApiProperty({
        description: 'The default price of a given part.',
        example: 14999.99,
        type: Number
    })
    defaultPrice: number;

    @IsNumber()
    @Min(1, { message: 'The time to produce must be a positive number.' })
    @IsNotEmpty({ message: 'The time to produce is required.' })
    @ApiProperty({
        description: 'Time of production of a part in seconds.',
        example: 360,
        type: Number
    })
    timeToProduce: number;
}

export class CreateManyPartInformationDto {
    @ValidateNested({ each: true })
    @Type(() => CreatePartInformationDto)
    @ApiProperty({
        description: 'Collection of part information objects.',
        type: [CreatePartInformationDto],
        example: [
            { defaultPrice: 14999.99, timeToProduce: 360 },
        ]
    })
    partInformations: CreatePartInformationDto[];
}  