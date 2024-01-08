import type * as grpc from '@grpc/grpc-js';
import type { MethodDefinition } from '@grpc/proto-loader';
import type { LoginRequest as _user_LoginRequest, LoginRequest__Output as _user_LoginRequest__Output } from '../user/LoginRequest';
import type { LoginResponse as _user_LoginResponse, LoginResponse__Output as _user_LoginResponse__Output } from '../user/LoginResponse';
export interface AuthServiceClient extends grpc.Client {
    login(argument: _user_LoginRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_LoginResponse__Output>): grpc.ClientUnaryCall;
    login(argument: _user_LoginRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_LoginResponse__Output>): grpc.ClientUnaryCall;
    login(argument: _user_LoginRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_LoginResponse__Output>): grpc.ClientUnaryCall;
    login(argument: _user_LoginRequest, callback: grpc.requestCallback<_user_LoginResponse__Output>): grpc.ClientUnaryCall;
    login(argument: _user_LoginRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_LoginResponse__Output>): grpc.ClientUnaryCall;
    login(argument: _user_LoginRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_LoginResponse__Output>): grpc.ClientUnaryCall;
    login(argument: _user_LoginRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_LoginResponse__Output>): grpc.ClientUnaryCall;
    login(argument: _user_LoginRequest, callback: grpc.requestCallback<_user_LoginResponse__Output>): grpc.ClientUnaryCall;
}
export interface AuthServiceHandlers extends grpc.UntypedServiceImplementation {
    login: grpc.handleUnaryCall<_user_LoginRequest__Output, _user_LoginResponse>;
}
export interface AuthServiceDefinition extends grpc.ServiceDefinition {
    login: MethodDefinition<_user_LoginRequest, _user_LoginResponse, _user_LoginRequest__Output, _user_LoginResponse__Output>;
}
