import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Admin, Kafka, Producer } from 'kafkajs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private readonly kafka: Kafka;
  private readonly producer: Producer;
  private readonly admin: Admin;

  constructor(private configService: ConfigService) {
    const brokers = [`${this.configService.get<string>('KAFKA_HOSTNAME')}:${this.configService.get<string>('KAFKA_PORT')}`];
    this.kafka = new Kafka({
      clientId: 'kafka-producer-service',
      brokers,
    });
    this.producer = this.kafka.producer();
    this.admin = this.kafka.admin();
  }

  async onModuleInit(): Promise<void> {
    await this.producer.connect();
  }

  async ensureTopicExists(topic: string): Promise<void> {
    const topics = await this.admin.listTopics();
    if (!topics.includes(topic)) {
      await this.admin.createTopics({
        topics: [{ topic }],
        waitForLeaders: false,
      });
      console.log(`Created topic ${topic}`);
    }
  }

  async sendMessage(topic: string, message: object): Promise<void> {
    try {
      await this.ensureTopicExists(topic);
      const payload = { value: JSON.stringify(message) };
      await this.producer.send({ topic, messages: [payload] });
      console.log(`Sent message to ${topic}:`, payload);
    } catch (error) {
      console.error('Error sending Kafka message:', error);
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.producer.disconnect();
  }
}