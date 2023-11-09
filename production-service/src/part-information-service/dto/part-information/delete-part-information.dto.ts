import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsPositive, ValidateNested } from 'class-validator';

class PartInformationToDeleteDto {
    @IsNumber()
    @IsPositive()
    id: number;
}

export class DeletePartInformationDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => PartInformationToDeleteDto)
    partInformations: PartInformationToDeleteDto[];
}
