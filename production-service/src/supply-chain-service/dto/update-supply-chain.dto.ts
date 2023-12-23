import { PartialType } from "@nestjs/mapped-types";
import { CreateSupplyChainDto } from "./create-supply-chain.dto";
import { IsArray, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateOneSupplyChainDto extends PartialType(CreateSupplyChainDto) { 
    @ApiProperty({
        description: 'Date of production for a given piece in timestamp (epoch)',
        example: "10/12/2023",
        type: String
    })
    timeOfProduction: Date;

    @ApiProperty({
        description: 'Id of a piece order.',
        example: 15,
        type: Number
    })
    order: number;
};

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
        example: [
            { id: 'cde7964c-819b-11ee-b962-0242ac120002', timeOfProduction: "15/12/2023" }
        ]
    })
    supplyChains: UpdateSupplyChainDto[];
};