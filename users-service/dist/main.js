"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const microservices_1 = require("@nestjs/microservices");
const app_module_1 = require("./app.module");
const core_1 = require("@nestjs/core");
const path_1 = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.connectMicroservice({
        transport: microservices_1.Transport.GRPC,
        options: {
            package: 'user',
            protoPath: (0, path_1.join)(__dirname, '../user.proto'),
            url: 'localhost:50051',
        },
    });
    await app.startAllMicroservices();
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map