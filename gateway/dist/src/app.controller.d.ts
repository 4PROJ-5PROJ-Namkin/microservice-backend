import { OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientGrpc } from '@nestjs/microservices';
import { LoginRequest } from './../generated/user/LoginRequest';
import { LoginResponse } from './../generated/user/LoginResponse';
import { UsersResponse } from 'generated/user/UsersResponse';
import { HelloResponse } from 'generated/user/HelloResponse';
export declare class AppController implements OnModuleInit {
    private readonly appService;
    private client;
    private usersService;
    private authService;
    constructor(appService: AppService, client: ClientGrpc);
    onModuleInit(): void;
    getHello(): Promise<HelloResponse>;
    getAllUsers(authHeader: any): Promise<UsersResponse>;
    login(loginData: LoginRequest): Promise<LoginResponse>;
}
