import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsPositive, ValidateNested } from 'class-validator';

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
