import { PartialType } from "@nestjs/mapped-types";
import { CreateSupplyChainDto } from "./create-supply-chain.dto";
import { IsArray, IsOptional, IsString, IsUUID, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateOneSupplyChainDto extends PartialType(CreateSupplyChainDto) {
    @ApiProperty({
        description: 'Updated date of production for the supply chain in timestamp (epoch)',
        example: "2023-12-10T00:00:00.000Z",
        type: String
    })
    timeOfProduction?: Date;

    @ApiProperty({
        description: 'Updated ID of the order associated with the supply chain.',
        example: 15,
        type: Number
    })
    order?: number;

    @ApiProperty({
        description: 'Updated ID of the machine associated with the supply chain.',
        example: 2,
        type: Number
    })
    machineId?: number;

    @ApiProperty({
        description: 'Updated ID of the part information associated with the supply chain.',
        example: 20,
        type: Number
    })
    partId?: number;
};

export class UpdateIndividualSupplyChainDto extends PartialType(CreateSupplyChainDto) {
    @IsUUID()
    @ApiProperty({
        description: 'UUID of the supply chain to update.',
        example: "d2f10ece-70ea-459e-aa29-68ad62287cce",
        type: String
    })
    id: string;
}

export class UpdateManySupplyChainDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateIndividualSupplyChainDto)
    @ApiProperty({
        description: 'Array of supply chain update objects.',
        type: [UpdateIndividualSupplyChainDto],
        example: [
            { id: 'd2f10ece-70ea-459e-aa29-68ad62287cce', timeOfProduction: "2023-12-10T00:00:00.000Z" }
        ]
    })
    supplyChains: UpdateIndividualSupplyChainDto[];
}