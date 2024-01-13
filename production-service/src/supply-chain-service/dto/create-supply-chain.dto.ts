import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreateSupplyChainDto {
    @IsDate()
    @ApiProperty({
        description: 'Date of production for a given piece in timestamp (epoch)',
        example: "2023-12-10T00:00:00.000Z",
        type: String
    })
    timeOfProduction: Date;

    @IsNumber()
    @ApiProperty({
        description: 'Id of a piece order.',
        example: 5,
        type: Number
    })
    order: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        type: Number
    })
    var1: number;

    @IsString()
    @ApiProperty({
        type: String
    })
    @IsOptional()
    var2: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String
    })
    var3: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty({
        type: Number
    })
    var4: number;

    @IsBoolean()
    @ApiProperty({
        description: 'State of a damaged piece.',
        example: false,
        type: Boolean
    })
    var5: boolean;

    @IsNumber()
    @ApiProperty({
        description: 'ID of a machine.',
        example: 1,
        type: Number
    })
    machineId: number;

    @IsNumber()
    @ApiProperty({
        description: 'ID of a part information.',
        example: 10,
        type: Number
    })
    partId: number;
}

export class CreateManySupplyChainDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateSupplyChainDto)
    @ApiProperty({
        description: 'Collection of supply chain objects.',
        type: [CreateSupplyChainDto],
        example: [
            { timeOfProduction: "2023-12-10T00:00:00.000Z", order: 5, var5: false, machineId: 1, partId: 40 },
        ]
    })
    supplyChains: CreateSupplyChainDto[];
}