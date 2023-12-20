import { IsArray, ValidateNested } from "class-validator";
import { CreateMaterialPriceDto } from "./create-material-price.dto";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class DeleteMaterialPriceDto extends CreateMaterialPriceDto {};

export class DeleteManyMaterialPricesDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => DeleteMaterialPriceDto)
    @ApiProperty({
        description: 'Array of material prices delete objects.',
        type: [DeleteMaterialPriceDto],
        example: [
            { price: 58.75, date: "10/10/2022" },
        ],
    })
    prices: DeleteMaterialPriceDto[];
};