const argon2 = require('argon2');
import { HttpException, HttpStatus, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { UpdateUsersDto } from './dto/update-users.dto';
import { ClientGrpc, GrpcMethod } from '@nestjs/microservices';
import { HelloResponse } from '../../generatedUserProto/user/HelloResponse';



interface AuthService {
  // decodeToken(token: Token): Promise<TokenStructure>;
}

@Injectable()
export class UsersService implements OnModuleInit{

  private authService : AuthService;

  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    // @Inject('AUTH_SERVICE') private authClient: ClientGrpc,
  ) { }
  onModuleInit() {
    // this.authService = this.authClient.getService('AuthService');
  }


  @GrpcMethod('UsersService', 'getHello')
  async getHello(): Promise<HelloResponse> {
    return { message: 'Je suis dans users-service' };
  }
  
  // @GrpcMethod('UsersService', 'getAllUsers')
  // async getAllUsers(headers: any): Promise<Users[]> {
  //   const token: Token = await headers.authorization.split(' ')[1];
  //   try {
  //     const decodedResponse = await this.authService.decodeToken(token);
  //     switch (decodedResponse.role) {
  //       case 'commercial':
  //         return await this.userRepository.findBy({ role: 'commercial' })
  //       case 'admin':
  //         return await this.userRepository.find()
  //     }
  //   } catch (error) {
  //     throw new HttpException({ message: 'Error finding users' }, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  // @GrpcMethod('UsersService', 'getUserById')
  // async getUserById(id: string, headers: any): Promise<Users> {

  //   const token: Token = await headers.authorization.split(' ')[1];
  //   const decoded = await DecodeToken(token);

  //   if (decoded.role === 'commercial' && decoded.id !== id) {
  //     throw new HttpException({ message: 'You are not allowed to access this resource' }, HttpStatus.UNAUTHORIZED);
  //   }

  //   if (decoded.id === id) {
  //     const user = await this.userRepository.findOneBy({ id })
  //     if (!user)
  //       throw new HttpException({ message: 'User not found' }, HttpStatus.NOT_FOUND);
  //     else
  //       return user;
  //   }

  //   if (decoded.role === 'commercial') {
  //     const user = await this.userRepository.findOneBy({ id, role: 'commercial' })
  //     if (!user)
  //       throw new HttpException({ message: 'User not found' }, HttpStatus.NOT_FOUND);
  //     else
  //       return user;
  //   }

  //   if (decoded.role === 'admin') {
  //     const user = await this.userRepository.findOneBy({ id })
  //     if (!user)
  //       throw new HttpException({ message: 'User not found' }, HttpStatus.NOT_FOUND);
  //     else
  //       return user;

  //   }
  // }

  // @GrpcMethod('UsersService', 'updateUser')
  // async updateUser(id: string, updatePasswordUserDto: UpdateUsersDto): Promise<UpdateResult> {
  //   const user = await this.userRepository.findOneBy({ id });
  //   if (!user)
  //     throw new HttpException({ message: 'User not found.' }, HttpStatus.NOT_FOUND);
  //   else {
  //     const userData = {
  //       password: await argon2.hash(updatePasswordUserDto.password),
  //     }
  //     return await this.userRepository.update({ id }, userData);
  //   }
  // }

  // @GrpcMethod('UsersService', 'deleteUser')
  // async deleteUser(id: string) {
  //   const user = await this.userRepository.findOneBy({ id });
  //   if (!user)
  //     throw new HttpException({ message: 'User not found.' }, HttpStatus.NOT_FOUND);
  //   else
  //     return await this.userRepository.delete({ id });
  // }
}