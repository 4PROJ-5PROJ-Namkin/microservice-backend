import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";

export class DeleteManySupplyChainDto {
    @IsArray()
    @ApiProperty({
        description: 'Array of supply chain delete objects.',
        type: [String],
        example: ['cde7964c-819b-11ee-b962-0242ac120002']
    })
    supplyChainIds: string[];
}