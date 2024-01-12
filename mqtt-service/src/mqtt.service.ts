import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttService {
  private readonly client: any;

  constructor(private configService: ConfigService) {
    this.client = mqtt.connect(`mqtt://${this.configService.get('MQTT_HOSTNAME')}:1883`, {
      username: this.configService.get('MQTT_USERNAME'),
      password: this.configService.get('MQTT_PASSWORD'),
    });
  }

  publishMessage(topic: string, message: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.publish(topic, message, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  }

  subscribeToTopic(topic: string, callback: (topic: string, message: string) => void): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.subscribe(topic, (error, granted) => {
        if (error) {
          reject(error);
        } else {
          resolve();
          this.client.on('message', (receivedTopic, receivedMessage) => {
            if (receivedTopic === topic) {
              callback(receivedTopic, receivedMessage.toString());
            }
          });
        }
      });
    });
  }
}
