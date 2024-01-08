import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';
import type { AuthServiceClient as _user_AuthServiceClient, AuthServiceDefinition as _user_AuthServiceDefinition } from './user/AuthService';
import type { UsersServiceClient as _user_UsersServiceClient, UsersServiceDefinition as _user_UsersServiceDefinition } from './user/UsersService';
type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
    new (...args: ConstructorParameters<Constructor>): Subtype;
};
export interface ProtoGrpcType {
    user: {
        AuthService: SubtypeConstructor<typeof grpc.Client, _user_AuthServiceClient> & {
            service: _user_AuthServiceDefinition;
        };
        Empty: MessageTypeDefinition;
        GetAllUsersRequest: MessageTypeDefinition;
        HelloResponse: MessageTypeDefinition;
        LoginRequest: MessageTypeDefinition;
        LoginResponse: MessageTypeDefinition;
        UserResponse: MessageTypeDefinition;
        UsersResponse: MessageTypeDefinition;
        UsersService: SubtypeConstructor<typeof grpc.Client, _user_UsersServiceClient> & {
            service: _user_UsersServiceDefinition;
        };
    };
}
export {};
