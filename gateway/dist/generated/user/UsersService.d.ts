import type * as grpc from '@grpc/grpc-js';
import type { MethodDefinition } from '@grpc/proto-loader';
import type { Empty as _user_Empty, Empty__Output as _user_Empty__Output } from '../user/Empty';
import type { HelloResponse as _user_HelloResponse, HelloResponse__Output as _user_HelloResponse__Output } from '../user/HelloResponse';
import type { UsersResponse as _user_UsersResponse, UsersResponse__Output as _user_UsersResponse__Output } from '../user/UsersResponse';
export interface UsersServiceClient extends grpc.Client {
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
}
export interface UsersServiceHandlers extends grpc.UntypedServiceImplementation {
    getAllUsers: grpc.handleUnaryCall<_user_Empty__Output, _user_UsersResponse>;
    getHello: grpc.handleUnaryCall<_user_Empty__Output, _user_HelloResponse>;
}
export interface UsersServiceDefinition extends grpc.ServiceDefinition {
    getAllUsers: MethodDefinition<_user_Empty, _user_UsersResponse, _user_Empty__Output, _user_UsersResponse__Output>;
    getHello: MethodDefinition<_user_Empty, _user_HelloResponse, _user_Empty__Output, _user_HelloResponse__Output>;
}
