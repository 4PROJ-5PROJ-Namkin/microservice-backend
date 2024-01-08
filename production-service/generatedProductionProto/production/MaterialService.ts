// Original file: production.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Empty as _production_Empty, Empty__Output as _production_Empty__Output } from '../production/Empty';
import type { MaterialRequest as _production_MaterialRequest, MaterialRequest__Output as _production_MaterialRequest__Output } from '../production/MaterialRequest';
import type { MaterialResponse as _production_MaterialResponse, MaterialResponse__Output as _production_MaterialResponse__Output } from '../production/MaterialResponse';
import type { MaterialResponses as _production_MaterialResponses, MaterialResponses__Output as _production_MaterialResponses__Output } from '../production/MaterialResponses';

export interface MaterialServiceClient extends grpc.Client {
  createMaterial(argument: _production_MaterialRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_production_MaterialResponse__Output>): grpc.ClientUnaryCall;
  createMaterial(argument: _production_MaterialRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_production_MaterialResponse__Output>): grpc.ClientUnaryCall;
  createMaterial(argument: _production_MaterialRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_production_MaterialResponse__Output>): grpc.ClientUnaryCall;
  createMaterial(argument: _production_MaterialRequest, callback: grpc.requestCallback<_production_MaterialResponse__Output>): grpc.ClientUnaryCall;
  createMaterial(argument: _production_MaterialRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_production_MaterialResponse__Output>): grpc.ClientUnaryCall;
  createMaterial(argument: _production_MaterialRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_production_MaterialResponse__Output>): grpc.ClientUnaryCall;
  createMaterial(argument: _production_MaterialRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_production_MaterialResponse__Output>): grpc.ClientUnaryCall;
  createMaterial(argument: _production_MaterialRequest, callback: grpc.requestCallback<_production_MaterialResponse__Output>): grpc.ClientUnaryCall;
  
  deleteMaterial(argument: _production_MaterialRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_production_Empty__Output>): grpc.ClientUnaryCall;
  deleteMaterial(argument: _production_MaterialRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_production_Empty__Output>): grpc.ClientUnaryCall;
  deleteMaterial(argument: _production_MaterialRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_production_Empty__Output>): grpc.ClientUnaryCall;
  deleteMaterial(argument: _production_MaterialRequest, callback: grpc.requestCallback<_production_Empty__Output>): grpc.ClientUnaryCall;
  deleteMaterial(argument: _production_MaterialRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_production_Empty__Output>): grpc.ClientUnaryCall;
  deleteMaterial(argument: _production_MaterialRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_production_Empty__Output>): grpc.ClientUnaryCall;
  deleteMaterial(argument: _production_MaterialRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_production_Empty__Output>): grpc.ClientUnaryCall;
  deleteMaterial(argument: _production_MaterialRequest, callback: grpc.requestCallback<_production_Empty__Output>): grpc.ClientUnaryCall;
  
  getMaterial(argument: _production_MaterialRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_production_MaterialResponse__Output>): grpc.ClientUnaryCall;
  getMaterial(argument: _production_MaterialRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_production_MaterialResponse__Output>): grpc.ClientUnaryCall;
  getMaterial(argument: _production_MaterialRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_production_MaterialResponse__Output>): grpc.ClientUnaryCall;
  getMaterial(argument: _production_MaterialRequest, callback: grpc.requestCallback<_production_MaterialResponse__Output>): grpc.ClientUnaryCall;
  getMaterial(argument: _production_MaterialRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_production_MaterialResponse__Output>): grpc.ClientUnaryCall;
  getMaterial(argument: _production_MaterialRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_production_MaterialResponse__Output>): grpc.ClientUnaryCall;
  getMaterial(argument: _production_MaterialRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_production_MaterialResponse__Output>): grpc.ClientUnaryCall;
  getMaterial(argument: _production_MaterialRequest, callback: grpc.requestCallback<_production_MaterialResponse__Output>): grpc.ClientUnaryCall;
  
  getMaterials(argument: _production_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_production_MaterialResponses__Output>): grpc.ClientUnaryCall;
  getMaterials(argument: _production_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_production_MaterialResponses__Output>): grpc.ClientUnaryCall;
  getMaterials(argument: _production_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_production_MaterialResponses__Output>): grpc.ClientUnaryCall;
  getMaterials(argument: _production_Empty, callback: grpc.requestCallback<_production_MaterialResponses__Output>): grpc.ClientUnaryCall;
  getMaterials(argument: _production_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_production_MaterialResponses__Output>): grpc.ClientUnaryCall;
  getMaterials(argument: _production_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_production_MaterialResponses__Output>): grpc.ClientUnaryCall;
  getMaterials(argument: _production_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_production_MaterialResponses__Output>): grpc.ClientUnaryCall;
  getMaterials(argument: _production_Empty, callback: grpc.requestCallback<_production_MaterialResponses__Output>): grpc.ClientUnaryCall;
  
  updateMaterial(argument: _production_MaterialRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_production_MaterialResponse__Output>): grpc.ClientUnaryCall;
  updateMaterial(argument: _production_MaterialRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_production_MaterialResponse__Output>): grpc.ClientUnaryCall;
  updateMaterial(argument: _production_MaterialRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_production_MaterialResponse__Output>): grpc.ClientUnaryCall;
  updateMaterial(argument: _production_MaterialRequest, callback: grpc.requestCallback<_production_MaterialResponse__Output>): grpc.ClientUnaryCall;
  updateMaterial(argument: _production_MaterialRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_production_MaterialResponse__Output>): grpc.ClientUnaryCall;
  updateMaterial(argument: _production_MaterialRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_production_MaterialResponse__Output>): grpc.ClientUnaryCall;
  updateMaterial(argument: _production_MaterialRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_production_MaterialResponse__Output>): grpc.ClientUnaryCall;
  updateMaterial(argument: _production_MaterialRequest, callback: grpc.requestCallback<_production_MaterialResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface MaterialServiceHandlers extends grpc.UntypedServiceImplementation {
  createMaterial: grpc.handleUnaryCall<_production_MaterialRequest__Output, _production_MaterialResponse>;
  
  deleteMaterial: grpc.handleUnaryCall<_production_MaterialRequest__Output, _production_Empty>;
  
  getMaterial: grpc.handleUnaryCall<_production_MaterialRequest__Output, _production_MaterialResponse>;
  
  getMaterials: grpc.handleUnaryCall<_production_Empty__Output, _production_MaterialResponses>;
  
  updateMaterial: grpc.handleUnaryCall<_production_MaterialRequest__Output, _production_MaterialResponse>;
  
}

export interface MaterialServiceDefinition extends grpc.ServiceDefinition {
  createMaterial: MethodDefinition<_production_MaterialRequest, _production_MaterialResponse, _production_MaterialRequest__Output, _production_MaterialResponse__Output>
  deleteMaterial: MethodDefinition<_production_MaterialRequest, _production_Empty, _production_MaterialRequest__Output, _production_Empty__Output>
  getMaterial: MethodDefinition<_production_MaterialRequest, _production_MaterialResponse, _production_MaterialRequest__Output, _production_MaterialResponse__Output>
  getMaterials: MethodDefinition<_production_Empty, _production_MaterialResponses, _production_Empty__Output, _production_MaterialResponses__Output>
  updateMaterial: MethodDefinition<_production_MaterialRequest, _production_MaterialResponse, _production_MaterialRequest__Output, _production_MaterialResponse__Output>
}
