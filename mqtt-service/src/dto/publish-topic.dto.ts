import { ApiProperty } from '@nestjs/swagger';

export class PublishDto {
    @ApiProperty({ example: 'supply-chain', description: 'The MQTT topic' })
    topic: string;

    @ApiProperty({
        example: "{\"timeOfProduction\": \"2023-12-10T00:00:00.000Z\",\"order\": 5,\"var5\": false,\"machineId\": 1,\"partId\": 4}",
        description: 'The message to publish'
    })
    message: string;
}