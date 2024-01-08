import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { MaterialServiceClient as _production_MaterialServiceClient, MaterialServiceDefinition as _production_MaterialServiceDefinition } from './production/MaterialService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  production: {
    Empty: MessageTypeDefinition
    MaterialRequest: MessageTypeDefinition
    MaterialResponse: MessageTypeDefinition
    MaterialResponses: MessageTypeDefinition
    MaterialService: SubtypeConstructor<typeof grpc.Client, _production_MaterialServiceClient> & { service: _production_MaterialServiceDefinition }
  }
}

