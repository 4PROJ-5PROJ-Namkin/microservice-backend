import { Module } from '@nestjs/common';
import { MqttController } from './mqtt.controller';
import { MqttService } from './mqtt.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [MqttController],
  providers: [MqttService],
})
export class MqttModule { }
