import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreateSupplyChainDto {
    @IsDate()
    @ApiProperty({
        description: 'Date of production for a given piece in timestamp (epoch)',
        example: "10/10/2023",
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

    @IsNumber({}, { each: true })
    @ApiProperty({
        description: 'Array of machine Ids.',
        example: [1, 2, 3, 4],
        type: [Number]
    })
    machineIds: number[];

    @IsNumber({}, { each: true })
    @ApiProperty({
        description: 'Array of part information Ids.',
        example: [10, 20, 30, 40],
        type: [Number]
    })
    partIds: number[];
}

export class CreateManySupplyChainDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateSupplyChainDto)
    @ApiProperty({
        description: 'Collection of supply chain objects.',
        type: [CreateSupplyChainDto],
        example: [
            { timeOfProduction: "10/12/2023", order: 5, var5: false, machineIds: [1, 4, 7], partIds: [40, 45, 50] },
        ]
    })
    supplyChains: CreateSupplyChainDto[];
}