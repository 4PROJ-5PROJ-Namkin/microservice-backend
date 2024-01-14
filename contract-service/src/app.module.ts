import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from './contract/entities/contract.entity';
import { ContractsModule } from './contract/contract.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'database',
      port: 5440,
      username: 'postgres',
      password: 'password',
      database: 'postgres',
      entities: [Contract],
      synchronize: true,
    }),
    AuthModule,
    ContractsModule,
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }