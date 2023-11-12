import { PartialType } from "@nestjs/mapped-types";
import { CreateSupplyChainDto } from "./create-supply-chain.dto";
import { IsArray, IsString, IsUUID, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class UpdateSupplyChainDto extends PartialType(CreateSupplyChainDto) { 
    @IsString()
    @IsUUID()
    id: string
};

export class UpdateManySupplyChainDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateSupplyChainDto)
    supplyChains: UpdateSupplyChainDto[];
};