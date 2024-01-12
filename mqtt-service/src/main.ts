import { NestFactory } from '@nestjs/core';
import { MqttModule } from './mqtt.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(MqttModule);
  const openApiOptions = new DocumentBuilder()
  .setTitle('MQTT API Service - Namkin X SUPINFO')
  .setVersion('v1')
  .addServer('/api/v1')
  .build();

const mqttDocument = SwaggerModule.createDocument(app, openApiOptions, {
  include: [MqttModule]
});
SwaggerModule.setup('api/v1/mqtt', app, mqttDocument);

  app.setGlobalPrefix('api/v1');
  await app.listen(3006);
}
bootstrap();
