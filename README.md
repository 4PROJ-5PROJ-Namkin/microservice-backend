# microservice-backend-1
commande a lancer 

docker network create shared-network


Generer le fichier code de user.proto en TypeScript
npx proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir=./generatedUserProto user.proto

npx proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir=./generatedAuthProto auth.proto

npx proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir=./generatedProductionProto production.proto

Pour demarrer chaque projet ↓

docker compose up --build