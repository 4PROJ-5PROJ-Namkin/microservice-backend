import { Type } from 'class-transformer';
import { IsArray, IsInt, ArrayNotEmpty, IsNumber, IsPositive, ValidateNested } from 'class-validator';

class MaterialToDeleteDto {
    @IsNumber()
    @IsPositive()
    id: number;
}

export class DeleteManyMaterialsDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => MaterialToDeleteDto)
    materials: MaterialToDeleteDto[];
}
