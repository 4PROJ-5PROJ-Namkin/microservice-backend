# microservice-backend-1
commande a lancer 

docker network create shared-network


Generer le fichier code de user.proto en TypeScript
npx proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir=./src/generatedUserProto user.proto

npx proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir=./src/generatedAuthProto auth.proto

npx proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir=./src/generatedProductionProto production.proto

Pour demarrer chaque projet ↓

docker compose up --build