import { IsArray, ValidateNested } from "class-validator";
import { CreateMaterialPriceDto } from "./create-material-price.dto";
import { Type } from "class-transformer";

export class DeleteMaterialPriceDto extends CreateMaterialPriceDto {};

export class DeleteManyMaterialPricesDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => DeleteMaterialPriceDto)
    prices: DeleteMaterialPriceDto[];
};