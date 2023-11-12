import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreateSupplyChainDto {
    @IsDate()
    timeOfProduction: Date;

    @IsNumber()
    order: number;

    @IsNumber()
    @IsOptional()
    var1: number;

    @IsString()
    @IsOptional()
    var2: string;

    @IsString()
    @IsOptional()
    var3: string;

    @IsNumber()
    @IsOptional()
    var4: number;

    @IsBoolean()
    var5: boolean;

    @IsNumber({}, { each: true })
    machineIds: number[];

    @IsNumber({}, { each: true })
    partIds: number[];
}

export class CreateManySupplyChainDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateSupplyChainDto)
    supplyChains: CreateSupplyChainDto[];
}