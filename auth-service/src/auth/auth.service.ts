const argon2 = require('argon2');
import { HttpException, HttpStatus, Injectable, OnModuleInit } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { HelloAuthResponse } from 'generatedAuthProto/auth/HelloAuthResponse';
import { LoginUserDto } from 'generatedAuthProto/auth/LoginUserDto';
import { Repository } from 'typeorm';
import { DecodeToken, GenerateToken } from './utils/jwt';
import { User } from 'generatedUserProto/user/User';
import { InjectRepository } from '@nestjs/typeorm';
import Users from './users.entity';
import { RegisterUserDto, Token, TokenStructure } from './dto/auth.dto';
let jwt = require('jsonwebtoken');

@Injectable()
export class AuthService implements OnModuleInit {
  
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) { }

  onModuleInit() {
   
  }

  @GrpcMethod('AuthService', 'getHelloAuth')
  async getHelloAuth(): Promise<HelloAuthResponse> {
    return { message: 'Je suis dans auth-service' };
  }

  @GrpcMethod('AuthService', 'login')
  async login(loginData: LoginUserDto): Promise<Token> {
    const user = await this.usersRepository.findOne({ where: { email: loginData.email }, select: ['id', 'password', 'role'] });

    if (!user)
      throw new HttpException({ message: 'User not found' }, HttpStatus.BAD_REQUEST);

    if (await argon2.verify(user.password, loginData.password)) {
      try {
        const token: Token = await GenerateToken({ id: user.id, role: user.role })
        console.log(token)
        return token
      } catch (error) {
        throw new HttpException({ message: 'Error during token generation' }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } else {
      throw new HttpException({ message: 'Wrong password' }, HttpStatus.BAD_REQUEST);
    }

    
  }

  @GrpcMethod('AuthService', 'DecodeToken')
  async DecodeToken(token: any): Promise<TokenStructure> {
    try {
      console.log('le token de decode token :', token);
      const token1: Token = await token.authorization.split(' ')[1];
      console.log('le token de decode token :', token1);
      return await jwt.decode(token1);
    } catch (error) {
      throw new HttpException({ message: 'Error decoding token'+ error }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @GrpcMethod('AuthService', 'createUser')
  async createUser(user: RegisterUserDto) {

    if (await this.usersRepository.findOneBy({ email: user.email }) || await this.usersRepository.findOneBy({ email: user.email }))
      throw new HttpException({ message: 'User may already exist' }, HttpStatus.BAD_REQUEST);

    const customerData = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      telephoneNumber: user.telephoneNumber,
      password: await argon2.hash(user.password),
      role: 'commercial'
    }

    try {
      await this.usersRepository.save(this.usersRepository.create(customerData))
    } catch (error) {
      throw new HttpException({ message: 'Error creating user' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }
}
