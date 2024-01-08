import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { UsersServiceClient as _user_UsersServiceClient, UsersServiceDefinition as _user_UsersServiceDefinition } from './user/UsersService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  user: {
    Empty: MessageTypeDefinition
    GetAllUsersRequest: MessageTypeDefinition
    HelloResponse: MessageTypeDefinition
    LoginUserDto: MessageTypeDefinition
    RegisterUserDto: MessageTypeDefinition
    Token: MessageTypeDefinition
    TokenStructure: MessageTypeDefinition
    UpdateUsersDto: MessageTypeDefinition
    User: MessageTypeDefinition
    UserByIdRequest: MessageTypeDefinition
    Users: MessageTypeDefinition
    UsersService: SubtypeConstructor<typeof grpc.Client, _user_UsersServiceClient> & { service: _user_UsersServiceDefinition }
  }
}

