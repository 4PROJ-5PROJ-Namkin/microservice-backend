"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
require("reflect-metadata");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Contract Service API - Namkin X Supinfo ')
        .setDescription('Namkin Api swagger')
        .setVersion('1.0')
        .addServer('/api/v1')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
    }, 'JWT-auth')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/v1/contract', app, document);
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.enableCors();
    await app.listen(4002);
}
bootstrap();
//# sourceMappingURL=main.js.map