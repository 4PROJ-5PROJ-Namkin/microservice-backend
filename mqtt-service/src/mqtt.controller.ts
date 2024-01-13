import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { PublishDto } from './dto/publish-topic.dto';
import { SubscribeDto } from './dto/subscribe-topic.dto';

@Controller('mqtt')
export class MqttController {
  constructor(private readonly mqttService: MqttService) {}

  @Post('publish')
  async publishMessage(@Body() publishDto: PublishDto) {
    try {
      await this.mqttService.publishMessage(publishDto.topic, publishDto.message);
      return { message: 'Message published successfully', value: publishDto.message };
    } catch (error) {
      throw new HttpException('Failed to publish message', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('subscribe')
  async subscribeToTopic(@Body() subscribeDto: SubscribeDto) {
    try {
      await this.mqttService.subscribeToTopic(subscribeDto.topic, (topic, message) => {
        console.log(`Received message: ${message} on topic: ${topic}`);
      });
      return { message: `Subscribed to topic ${subscribeDto.topic}` };
    } catch (error) {
      throw new HttpException('Failed to subscribe to topic', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
