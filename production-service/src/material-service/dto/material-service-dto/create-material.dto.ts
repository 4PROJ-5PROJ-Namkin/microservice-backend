import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class CreateMaterialDto {
    @IsNotEmpty()
    @IsString()
    name: string;
}

export class CreateManyMaterialsDto {
    @ValidateNested({ each: true })
    @Type(() => CreateMaterialDto)
    materials: CreateMaterialDto[];
}  