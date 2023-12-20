import { IsNotEmpty, IsNumber, IsOptional, IsPositive, Min, ValidateNested } from "class-validator";
import { CreatePartInformationDto } from "./create-part-information.dto";
import { Type } from "class-transformer";
import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";

export class UpdatePartInformationDto extends PartialType(CreatePartInformationDto) {
    @IsNumber()
    @IsPositive()
    @ApiProperty({
        description: 'Part Information ID.',
        example: 47,
        type: Number
    })
    id: number;
};

export class UpdateManyPartInformationDto {
    @ValidateNested({ each: true })
    @Type(() => UpdatePartInformationDto)
    @ApiProperty({
        description: 'Array of part update objects.',
        type: [CreatePartInformationDto],
        example: [
            { id: 8, defaultPrice: 14999.99, timeToProduce: 360 },
        ],
    })
    partInformations: UpdatePartInformationDto[];
};