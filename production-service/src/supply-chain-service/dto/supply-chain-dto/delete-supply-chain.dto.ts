import { IsArray } from "class-validator";
import { UUID } from "./params-supply-chain.dto";
import { Type } from "class-transformer";

export class DeleteManySupplyChainDto {
    @IsArray()
    @Type(() => UUID)
    supplyChainIds: UUID[];
}
