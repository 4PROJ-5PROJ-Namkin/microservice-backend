import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from './contract/entities/contract.entity';
import { ContractsModule } from './contract/contract.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5440,
      password: 'password',
      database: 'postgres',
      entities: [Contract],
      synchronize: true,
    }),
    ContractsModule,
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }