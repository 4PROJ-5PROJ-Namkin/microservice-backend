import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMaterialPartInformationsDto {
    @IsArray()
    @IsNotEmpty()
    @IsNumber({}, { each: true })
    partInformationIds: number[];
}