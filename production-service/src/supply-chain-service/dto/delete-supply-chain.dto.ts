import { IsArray } from "class-validator";

export class DeleteManySupplyChainDto {
    @IsArray()
    supplyChainIds: string[];
}
