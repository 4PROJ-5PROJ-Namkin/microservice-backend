import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SubscribeDto {
  @IsString()
  @ApiProperty({ example: 'supply-chain', description: 'The MQTT topic to subscribe to' })
  topic: string;
}