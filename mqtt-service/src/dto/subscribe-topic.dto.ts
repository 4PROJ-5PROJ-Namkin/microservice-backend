import { ApiProperty } from '@nestjs/swagger';

export class SubscribeDto {
  @ApiProperty({ example: 'supply-chain', description: 'The MQTT topic to subscribe to' })
  topic: string;
}