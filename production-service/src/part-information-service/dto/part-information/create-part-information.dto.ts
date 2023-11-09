import { Type } from 'class-transformer';
import { IsNumber, Min, IsNotEmpty, ValidateNested } from 'class-validator';

export class CreatePartInformationDto {
    @IsNumber()
    @Min(0, { message: 'The default price must be a non-negative number.' })
    defaultPrice: number;

    @IsNumber()
    @Min(1, { message: 'The time to produce must be a positive number.' })
    @IsNotEmpty({ message: 'The time to produce is required.' })
    timeToProduce: number;
}

export class CreateManyPartInformationDto {
    @ValidateNested({ each: true })
    @Type(() => CreatePartInformationDto)
    partInformations: CreatePartInformationDto[];
}  