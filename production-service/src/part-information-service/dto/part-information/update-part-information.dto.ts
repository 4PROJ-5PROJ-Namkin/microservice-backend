import { IsNotEmpty, IsNumber, IsOptional, IsPositive, Min, ValidateNested } from "class-validator";
import { CreatePartInformationDto } from "./create-part-information.dto";
import { Type } from "class-transformer";
import { PartialType } from "@nestjs/mapped-types";

export class UpdatePartInformationDto extends PartialType(CreatePartInformationDto) {
    @IsNumber()
    @IsPositive()
    id: number;
};

export class UpdateManyPartInformationDto {
    @ValidateNested({ each: true })
    @Type(() => UpdatePartInformationDto)
    partInformations: UpdatePartInformationDto[];
};