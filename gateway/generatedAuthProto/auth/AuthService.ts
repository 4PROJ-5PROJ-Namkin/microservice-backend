// Original file: auth.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Empty as _auth_Empty, Empty__Output as _auth_Empty__Output } from '../auth/Empty';
import type { HelloAuthResponse as _auth_HelloAuthResponse, HelloAuthResponse__Output as _auth_HelloAuthResponse__Output } from '../auth/HelloAuthResponse';
import type { LoginUserDto as _auth_LoginUserDto, LoginUserDto__Output as _auth_LoginUserDto__Output } from '../auth/LoginUserDto';
import type { RegisterUserDto as _auth_RegisterUserDto, RegisterUserDto__Output as _auth_RegisterUserDto__Output } from '../auth/RegisterUserDto';
import type { Token as _auth_Token, Token__Output as _auth_Token__Output } from '../auth/Token';
import type { TokenStructure as _auth_TokenStructure, TokenStructure__Output as _auth_TokenStructure__Output } from '../auth/TokenStructure';
import type { User as _auth_User, User__Output as _auth_User__Output } from '../auth/User';

export interface AuthServiceClient extends grpc.Client {
  DecodeToken(argument: _auth_Token, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_TokenStructure__Output>): grpc.ClientUnaryCall;
  DecodeToken(argument: _auth_Token, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_TokenStructure__Output>): grpc.ClientUnaryCall;
  DecodeToken(argument: _auth_Token, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_TokenStructure__Output>): grpc.ClientUnaryCall;
  DecodeToken(argument: _auth_Token, callback: grpc.requestCallback<_auth_TokenStructure__Output>): grpc.ClientUnaryCall;
  decodeToken(argument: _auth_Token, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_TokenStructure__Output>): grpc.ClientUnaryCall;
  decodeToken(argument: _auth_Token, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_TokenStructure__Output>): grpc.ClientUnaryCall;
  decodeToken(argument: _auth_Token, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_TokenStructure__Output>): grpc.ClientUnaryCall;
  decodeToken(argument: _auth_Token, callback: grpc.requestCallback<_auth_TokenStructure__Output>): grpc.ClientUnaryCall;
  
  createCommercial(argument: _auth_RegisterUserDto, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_User__Output>): grpc.ClientUnaryCall;
  createCommercial(argument: _auth_RegisterUserDto, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_User__Output>): grpc.ClientUnaryCall;
  createCommercial(argument: _auth_RegisterUserDto, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_User__Output>): grpc.ClientUnaryCall;
  createCommercial(argument: _auth_RegisterUserDto, callback: grpc.requestCallback<_auth_User__Output>): grpc.ClientUnaryCall;
  createCommercial(argument: _auth_RegisterUserDto, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_User__Output>): grpc.ClientUnaryCall;
  createCommercial(argument: _auth_RegisterUserDto, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_User__Output>): grpc.ClientUnaryCall;
  createCommercial(argument: _auth_RegisterUserDto, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_User__Output>): grpc.ClientUnaryCall;
  createCommercial(argument: _auth_RegisterUserDto, callback: grpc.requestCallback<_auth_User__Output>): grpc.ClientUnaryCall;
  
  getHelloAuth(argument: _auth_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_HelloAuthResponse__Output>): grpc.ClientUnaryCall;
  getHelloAuth(argument: _auth_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_HelloAuthResponse__Output>): grpc.ClientUnaryCall;
  getHelloAuth(argument: _auth_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_HelloAuthResponse__Output>): grpc.ClientUnaryCall;
  getHelloAuth(argument: _auth_Empty, callback: grpc.requestCallback<_auth_HelloAuthResponse__Output>): grpc.ClientUnaryCall;
  getHelloAuth(argument: _auth_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_HelloAuthResponse__Output>): grpc.ClientUnaryCall;
  getHelloAuth(argument: _auth_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_HelloAuthResponse__Output>): grpc.ClientUnaryCall;
  getHelloAuth(argument: _auth_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_HelloAuthResponse__Output>): grpc.ClientUnaryCall;
  getHelloAuth(argument: _auth_Empty, callback: grpc.requestCallback<_auth_HelloAuthResponse__Output>): grpc.ClientUnaryCall;
  
  login(argument: _auth_LoginUserDto, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_Token__Output>): grpc.ClientUnaryCall;
  login(argument: _auth_LoginUserDto, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_Token__Output>): grpc.ClientUnaryCall;
  login(argument: _auth_LoginUserDto, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_Token__Output>): grpc.ClientUnaryCall;
  login(argument: _auth_LoginUserDto, callback: grpc.requestCallback<_auth_Token__Output>): grpc.ClientUnaryCall;
  login(argument: _auth_LoginUserDto, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_Token__Output>): grpc.ClientUnaryCall;
  login(argument: _auth_LoginUserDto, metadata: grpc.Metadata, callback: grpc.requestCallback<_auth_Token__Output>): grpc.ClientUnaryCall;
  login(argument: _auth_LoginUserDto, options: grpc.CallOptions, callback: grpc.requestCallback<_auth_Token__Output>): grpc.ClientUnaryCall;
  login(argument: _auth_LoginUserDto, callback: grpc.requestCallback<_auth_Token__Output>): grpc.ClientUnaryCall;
  
}

export interface AuthServiceHandlers extends grpc.UntypedServiceImplementation {
  DecodeToken: grpc.handleUnaryCall<_auth_Token__Output, _auth_TokenStructure>;
  
  createCommercial: grpc.handleUnaryCall<_auth_RegisterUserDto__Output, _auth_User>;
  
  getHelloAuth: grpc.handleUnaryCall<_auth_Empty__Output, _auth_HelloAuthResponse>;
  
  login: grpc.handleUnaryCall<_auth_LoginUserDto__Output, _auth_Token>;
  
}

export interface AuthServiceDefinition extends grpc.ServiceDefinition {
  DecodeToken: MethodDefinition<_auth_Token, _auth_TokenStructure, _auth_Token__Output, _auth_TokenStructure__Output>
  createCommercial: MethodDefinition<_auth_RegisterUserDto, _auth_User, _auth_RegisterUserDto__Output, _auth_User__Output>
  getHelloAuth: MethodDefinition<_auth_Empty, _auth_HelloAuthResponse, _auth_Empty__Output, _auth_HelloAuthResponse__Output>
  login: MethodDefinition<_auth_LoginUserDto, _auth_Token, _auth_LoginUserDto__Output, _auth_Token__Output>
}
