# microservice-backend-1
commande a lancer 

```docker network create shared-network```


Generer le fichier code de user.proto
npx proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir=./generatedUserProto user.proto

npx proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir=./generatedProductionProto production.proto

npm run build