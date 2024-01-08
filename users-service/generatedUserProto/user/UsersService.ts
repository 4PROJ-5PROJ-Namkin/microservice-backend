// Original file: user.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Empty as _user_Empty, Empty__Output as _user_Empty__Output } from '../user/Empty';
import type { HelloResponse as _user_HelloResponse, HelloResponse__Output as _user_HelloResponse__Output } from '../user/HelloResponse';
import type { Token as _user_Token, Token__Output as _user_Token__Output } from '../user/Token';
import type { UpdateUsersDto as _user_UpdateUsersDto, UpdateUsersDto__Output as _user_UpdateUsersDto__Output } from '../user/UpdateUsersDto';
import type { User as _user_User, User__Output as _user_User__Output } from '../user/User';
import type { UserByIdRequest as _user_UserByIdRequest, UserByIdRequest__Output as _user_UserByIdRequest__Output } from '../user/UserByIdRequest';
import type { Users as _user_Users, Users__Output as _user_Users__Output } from '../user/Users';

export interface UsersServiceClient extends grpc.Client {
  deleteUser(argument: _user_UserByIdRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_Empty__Output>): grpc.ClientUnaryCall;
  deleteUser(argument: _user_UserByIdRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_Empty__Output>): grpc.ClientUnaryCall;
  deleteUser(argument: _user_UserByIdRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_Empty__Output>): grpc.ClientUnaryCall;
  deleteUser(argument: _user_UserByIdRequest, callback: grpc.requestCallback<_user_Empty__Output>): grpc.ClientUnaryCall;
  deleteUser(argument: _user_UserByIdRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_Empty__Output>): grpc.ClientUnaryCall;
  deleteUser(argument: _user_UserByIdRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_Empty__Output>): grpc.ClientUnaryCall;
  deleteUser(argument: _user_UserByIdRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_Empty__Output>): grpc.ClientUnaryCall;
  deleteUser(argument: _user_UserByIdRequest, callback: grpc.requestCallback<_user_Empty__Output>): grpc.ClientUnaryCall;
  
  getAllUsers(argument: _user_Token, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_Users__Output>): grpc.ClientUnaryCall;
  getAllUsers(argument: _user_Token, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_Users__Output>): grpc.ClientUnaryCall;
  getAllUsers(argument: _user_Token, options: grpc.CallOptions, callback: grpc.requestCallback<_user_Users__Output>): grpc.ClientUnaryCall;
  getAllUsers(argument: _user_Token, callback: grpc.requestCallback<_user_Users__Output>): grpc.ClientUnaryCall;
  getAllUsers(argument: _user_Token, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_Users__Output>): grpc.ClientUnaryCall;
  getAllUsers(argument: _user_Token, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_Users__Output>): grpc.ClientUnaryCall;
  getAllUsers(argument: _user_Token, options: grpc.CallOptions, callback: grpc.requestCallback<_user_Users__Output>): grpc.ClientUnaryCall;
  getAllUsers(argument: _user_Token, callback: grpc.requestCallback<_user_Users__Output>): grpc.ClientUnaryCall;
  
  getHello(argument: _user_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_HelloResponse__Output>): grpc.ClientUnaryCall;
  getHello(argument: _user_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_HelloResponse__Output>): grpc.ClientUnaryCall;
  getHello(argument: _user_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_user_HelloResponse__Output>): grpc.ClientUnaryCall;
  getHello(argument: _user_Empty, callback: grpc.requestCallback<_user_HelloResponse__Output>): grpc.ClientUnaryCall;
  getHello(argument: _user_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_HelloResponse__Output>): grpc.ClientUnaryCall;
  getHello(argument: _user_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_HelloResponse__Output>): grpc.ClientUnaryCall;
  getHello(argument: _user_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_user_HelloResponse__Output>): grpc.ClientUnaryCall;
  getHello(argument: _user_Empty, callback: grpc.requestCallback<_user_HelloResponse__Output>): grpc.ClientUnaryCall;
  
  getUserById(argument: _user_UserByIdRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  getUserById(argument: _user_UserByIdRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  getUserById(argument: _user_UserByIdRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  getUserById(argument: _user_UserByIdRequest, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  getUserById(argument: _user_UserByIdRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  getUserById(argument: _user_UserByIdRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  getUserById(argument: _user_UserByIdRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  getUserById(argument: _user_UserByIdRequest, callback: grpc.requestCallback<_user_User__Output>): grpc.ClientUnaryCall;
  
  updateUser(argument: _user_UpdateUsersDto, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_UpdateUsersDto__Output>): grpc.ClientUnaryCall;
  updateUser(argument: _user_UpdateUsersDto, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_UpdateUsersDto__Output>): grpc.ClientUnaryCall;
  updateUser(argument: _user_UpdateUsersDto, options: grpc.CallOptions, callback: grpc.requestCallback<_user_UpdateUsersDto__Output>): grpc.ClientUnaryCall;
  updateUser(argument: _user_UpdateUsersDto, callback: grpc.requestCallback<_user_UpdateUsersDto__Output>): grpc.ClientUnaryCall;
  updateUser(argument: _user_UpdateUsersDto, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_user_UpdateUsersDto__Output>): grpc.ClientUnaryCall;
  updateUser(argument: _user_UpdateUsersDto, metadata: grpc.Metadata, callback: grpc.requestCallback<_user_UpdateUsersDto__Output>): grpc.ClientUnaryCall;
  updateUser(argument: _user_UpdateUsersDto, options: grpc.CallOptions, callback: grpc.requestCallback<_user_UpdateUsersDto__Output>): grpc.ClientUnaryCall;
  updateUser(argument: _user_UpdateUsersDto, callback: grpc.requestCallback<_user_UpdateUsersDto__Output>): grpc.ClientUnaryCall;
  
}

export interface UsersServiceHandlers extends grpc.UntypedServiceImplementation {
  deleteUser: grpc.handleUnaryCall<_user_UserByIdRequest__Output, _user_Empty>;
  
  getAllUsers: grpc.handleUnaryCall<_user_Token__Output, _user_Users>;
  
  getHello: grpc.handleUnaryCall<_user_Empty__Output, _user_HelloResponse>;
  
  getUserById: grpc.handleUnaryCall<_user_UserByIdRequest__Output, _user_User>;
  
  updateUser: grpc.handleUnaryCall<_user_UpdateUsersDto__Output, _user_UpdateUsersDto>;
  
}

export interface UsersServiceDefinition extends grpc.ServiceDefinition {
  deleteUser: MethodDefinition<_user_UserByIdRequest, _user_Empty, _user_UserByIdRequest__Output, _user_Empty__Output>
  getAllUsers: MethodDefinition<_user_Token, _user_Users, _user_Token__Output, _user_Users__Output>
  getHello: MethodDefinition<_user_Empty, _user_HelloResponse, _user_Empty__Output, _user_HelloResponse__Output>
  getUserById: MethodDefinition<_user_UserByIdRequest, _user_User, _user_UserByIdRequest__Output, _user_User__Output>
  updateUser: MethodDefinition<_user_UpdateUsersDto, _user_UpdateUsersDto, _user_UpdateUsersDto__Output, _user_UpdateUsersDto__Output>
}
