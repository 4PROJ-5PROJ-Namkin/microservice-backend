import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PublishDto {
    @IsString()
    @ApiProperty({ example: 'supply-chain', description: 'The MQTT topic' })
    topic: string;

    @IsString()
    @ApiProperty({
        example: "{\"timeOfProduction\": \"2023-12-10T00:00:00.000Z\",\"order\": 5,\"var5\": false,\"machineId\": 1,\"partId\": 4}",
        description: 'The message to publish'
    })
    message: string;
}