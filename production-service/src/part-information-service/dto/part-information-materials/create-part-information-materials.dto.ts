import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePartInformationMaterialsDto {
    @IsArray()
    @IsNotEmpty()
    @IsNumber({}, { each: true })
    materialIds: number[];
}