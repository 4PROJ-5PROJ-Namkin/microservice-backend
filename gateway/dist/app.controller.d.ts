import { OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientGrpc } from '@nestjs/microservices';
export declare class AppController implements OnModuleInit {
    private readonly appService;
    private client;
    private userService;
    constructor(appService: AppService, client: ClientGrpc);
    onModuleInit(): void;
    getHello(): Promise<string>;
}
