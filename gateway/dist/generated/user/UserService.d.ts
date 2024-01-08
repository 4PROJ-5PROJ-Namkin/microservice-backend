import type * as grpc from '@grpc/grpc-js';
import type { MethodDefinition } from '@grpc/proto-loader';
import type { Empty as _user_Empty, Empty__Output as _user_Empty__Output } from '../user/Empty';
import type { HelloResponse as _user_HelloResponse, HelloResponse__Output as _user_HelloResponse__Output } from '../user/HelloResponse';
import type { LoginRequest as _user_LoginRequest, LoginRequest__Output as _user_LoginRequest__Output } from '../user/LoginRequest';
import type { LoginResponse as _user_LoginResponse, LoginResponse__Output as _user_LoginResponse__Output } from '../user/LoginResponse';
import type { UsersResponse as _user_UsersResponse, UsersResponse__Output as _user_UsersResponse__Output } from '../user/UsersResponse';
export interface UserServiceClient extends grpc.Client {
    getAllUsers(argument: _user_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_UsersResponse__Output>): grpc.ClientUnaryCall;
    getAllUsers(argument: _user_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_UsersResponse__Output>): grpc.ClientUnaryCall;
    getAllUsers(argument: _user_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_user_UsersResponse__Output>): grpc.ClientUnaryCall;
    getAllUsers(argument: _user_Empty, callback: grpc.requestCallback<_user_UsersResponse__Output>): grpc.ClientUnaryCall;
    getAllUsers(argument: _user_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_UsersResponse__Output>): grpc.ClientUnaryCall;
    getAllUsers(argument: _user_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_UsersResponse__Output>): grpc.ClientUnaryCall;
    getAllUsers(argument: _user_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_user_UsersResponse__Output>): grpc.ClientUnaryCall;
    getAllUsers(argument: _user_Empty, callback: grpc.requestCallback<_user_UsersResponse__Output>): grpc.ClientUnaryCall;
    getHello(argument: _user_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_HelloResponse__Output>): grpc.ClientUnaryCall;
    getHello(argument: _user_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_HelloResponse__Output>): grpc.ClientUnaryCall;
    getHello(argument: _user_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_user_HelloResponse__Output>): grpc.ClientUnaryCall;
    getHello(argument: _user_Empty, callback: grpc.requestCallback<_user_HelloResponse__Output>): grpc.ClientUnaryCall;
    getHello(argument: _user_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_HelloResponse__Output>): grpc.ClientUnaryCall;
    getHello(argument: _user_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_HelloResponse__Output>): grpc.ClientUnaryCall;
    getHello(argument: _user_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_user_HelloResponse__Output>): grpc.ClientUnaryCall;
    getHello(argument: _user_Empty, callback: grpc.requestCallback<_user_HelloResponse__Output>): grpc.ClientUnaryCall;
    login(argument: _user_LoginRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_LoginResponse__Output>): grpc.ClientUnaryCall;
    login(argument: _user_LoginRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_LoginResponse__Output>): grpc.ClientUnaryCall;
    login(argument: _user_LoginRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_LoginResponse__Output>): grpc.ClientUnaryCall;
    login(argument: _user_LoginRequest, callback: grpc.requestCallback<_user_LoginResponse__Output>): grpc.ClientUnaryCall;
    login(argument: _user_LoginRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_LoginResponse__Output>): grpc.ClientUnaryCall;
    login(argument: _user_LoginRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_LoginResponse__Output>): grpc.ClientUnaryCall;
    login(argument: _user_LoginRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_LoginResponse__Output>): grpc.ClientUnaryCall;
    login(argument: _user_LoginRequest, callback: grpc.requestCallback<_user_LoginResponse__Output>): grpc.ClientUnaryCall;
}
export interface UserServiceHandlers extends grpc.UntypedServiceImplementation {
    getAllUsers: grpc.handleUnaryCall<_user_Empty__Output, _user_UsersResponse>;
    getHello: grpc.handleUnaryCall<_user_Empty__Output, _user_HelloResponse>;
    login: grpc.handleUnaryCall<_user_LoginRequest__Output, _user_LoginResponse>;
}
export interface UserServiceDefinition extends grpc.ServiceDefinition {
    getAllUsers: MethodDefinition<_user_Empty, _user_UsersResponse, _user_Empty__Output, _user_UsersResponse__Output>;
    getHello: MethodDefinition<_user_Empty, _user_HelloResponse, _user_Empty__Output, _user_HelloResponse__Output>;
    login: MethodDefinition<_user_LoginRequest, _user_LoginResponse, _user_LoginRequest__Output, _user_LoginResponse__Output>;
}
