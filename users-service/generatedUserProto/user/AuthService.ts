// Original file: user.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Empty as _user_Empty, Empty__Output as _user_Empty__Output } from '../user/Empty';
import type { HelloResponse as _user_HelloResponse, HelloResponse__Output as _user_HelloResponse__Output } from '../user/HelloResponse';
import type { LoginUserDto as _user_LoginUserDto, LoginUserDto__Output as _user_LoginUserDto__Output } from '../user/LoginUserDto';
import type { RegisterUserDto as _user_RegisterUserDto, RegisterUserDto__Output as _user_RegisterUserDto__Output } from '../user/RegisterUserDto';
import type { Token as _user_Token, Token__Output as _user_Token__Output } from '../user/Token';
import type { TokenStructure as _user_TokenStructure, TokenStructure__Output as _user_TokenStructure__Output } from '../user/TokenStructure';
import type { User as _user_User, User__Output as _user_User__Output } from '../user/User';

export interface AuthServiceClient extends grpc.Client {
  DecodeToken(argument: _user_Token, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_TokenStructure__Output>): grpc.ClientUnaryCall;
  DecodeToken(argument: _user_Token, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_TokenStructure__Output>): grpc.ClientUnaryCall;
  DecodeToken(argument: _user_Token, options: grpc.CallOptions, callback: grpc.requestCallback<_user_TokenStructure__Output>): grpc.ClientUnaryCall;
  DecodeToken(argument: _user_Token, callback: grpc.requestCallback<_user_TokenStructure__Output>): grpc.ClientUnaryCall;
  decodeToken(argument: _user_Token, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_TokenStructure__Output>): grpc.ClientUnaryCall;
  decodeToken(argument: _user_Token, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_TokenStructure__Output>): grpc.ClientUnaryCall;
  decodeToken(argument: _user_Token, options: grpc.CallOptions, callback: grpc.requestCallback<_user_TokenStructure__Output>): grpc.ClientUnaryCall;
  decodeToken(argument: _user_Token, callback: grpc.requestCallback<_user_TokenStructure__Output>): grpc.ClientUnaryCall;
  
  createCommercial(argument: _user_RegisterUserDto, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  createCommercial(argument: _user_RegisterUserDto, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  createCommercial(argument: _user_RegisterUserDto, options: grpc.CallOptions, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  createCommercial(argument: _user_RegisterUserDto, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  createCommercial(argument: _user_RegisterUserDto, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  createCommercial(argument: _user_RegisterUserDto, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  createCommercial(argument: _user_RegisterUserDto, options: grpc.CallOptions, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  createCommercial(argument: _user_RegisterUserDto, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  
  getHelloAuth(argument: _user_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_HelloResponse__Output>): grpc.ClientUnaryCall;
  getHelloAuth(argument: _user_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_HelloResponse__Output>): grpc.ClientUnaryCall;
  getHelloAuth(argument: _user_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_user_HelloResponse__Output>): grpc.ClientUnaryCall;
  getHelloAuth(argument: _user_Empty, callback: grpc.requestCallback<_user_HelloResponse__Output>): grpc.ClientUnaryCall;
  getHelloAuth(argument: _user_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_HelloResponse__Output>): grpc.ClientUnaryCall;
  getHelloAuth(argument: _user_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_HelloResponse__Output>): grpc.ClientUnaryCall;
  getHelloAuth(argument: _user_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_user_HelloResponse__Output>): grpc.ClientUnaryCall;
  getHelloAuth(argument: _user_Empty, callback: grpc.requestCallback<_user_HelloResponse__Output>): grpc.ClientUnaryCall;
  
  login(argument: _user_LoginUserDto, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_Token__Output>): grpc.ClientUnaryCall;
  login(argument: _user_LoginUserDto, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_Token__Output>): grpc.ClientUnaryCall;
  login(argument: _user_LoginUserDto, options: grpc.CallOptions, callback: grpc.requestCallback<_user_Token__Output>): grpc.ClientUnaryCall;
  login(argument: _user_LoginUserDto, callback: grpc.requestCallback<_user_Token__Output>): grpc.ClientUnaryCall;
  login(argument: _user_LoginUserDto, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_Token__Output>): grpc.ClientUnaryCall;
  login(argument: _user_LoginUserDto, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_Token__Output>): grpc.ClientUnaryCall;
  login(argument: _user_LoginUserDto, options: grpc.CallOptions, callback: grpc.requestCallback<_user_Token__Output>): grpc.ClientUnaryCall;
  login(argument: _user_LoginUserDto, callback: grpc.requestCallback<_user_Token__Output>): grpc.ClientUnaryCall;
  
}

export interface AuthServiceHandlers extends grpc.UntypedServiceImplementation {
  DecodeToken: grpc.handleUnaryCall<_user_Token__Output, _user_TokenStructure>;
  
  createCommercial: grpc.handleUnaryCall<_user_RegisterUserDto__Output, _user_User>;
  
  getHelloAuth: grpc.handleUnaryCall<_user_Empty__Output, _user_HelloResponse>;
  
  login: grpc.handleUnaryCall<_user_LoginUserDto__Output, _user_Token>;
  
}

export interface AuthServiceDefinition extends grpc.ServiceDefinition {
  DecodeToken: MethodDefinition<_user_Token, _user_TokenStructure, _user_Token__Output, _user_TokenStructure__Output>
  createCommercial: MethodDefinition<_user_RegisterUserDto, _user_User, _user_RegisterUserDto__Output, _user_User__Output>
  getHelloAuth: MethodDefinition<_user_Empty, _user_HelloResponse, _user_Empty__Output, _user_HelloResponse__Output>
  login: MethodDefinition<_user_LoginUserDto, _user_Token, _user_LoginUserDto__Output, _user_Token__Output>
}
