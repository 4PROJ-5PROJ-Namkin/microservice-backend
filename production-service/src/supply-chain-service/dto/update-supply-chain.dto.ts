import { PartialType } from "@nestjs/mapped-types";
import { CreateSupplyChainDto } from "./create-supply-chain.dto";
import { IsArray, IsString, IsUUID, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateSupplyChainDto extends PartialType(CreateSupplyChainDto) { 
    @IsString()
    @IsUUID()
    @ApiProperty({
        description: 'UUID of a given supply chain.',
        example: "cde7964c-819b-11ee-b962-0242ac120002",
        type: String
    })
    id: string
};

export class UpdateManySupplyChainDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateSupplyChainDto)
    @ApiProperty({
        description: 'Array of supply chain update objects.',
        type: [UpdateSupplyChainDto],
        example: ['cde7964c-819b-11ee-b962-0242ac120002']
    })
    supplyChains: UpdateSupplyChainDto[];
};