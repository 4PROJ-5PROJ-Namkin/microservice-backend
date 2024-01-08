const argon2 = require('argon2');
import { HttpException, HttpStatus, Headers, Injectable, OnModuleInit } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { UpdateUsersDto } from './dto/update-users.dto';
import { ClientGrpc, GrpcMethod, RpcException } from '@nestjs/microservices';
import { HelloResponse } from '../../generatedUserProto/user/HelloResponse';
import { Token } from '../../generatedUserProto/user/Token';
import { TokenStructure } from '../../generatedUserProto/user/TokenStructure';



interface AuthService {
  decodeToken(token: string): Promise<TokenStructure>;
}

@Injectable()
export class UsersService implements OnModuleInit {

  private authService: AuthService;

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
  // async getAllUsers(token: any): Promise<Users[]> {
  //   try {
  //     console.log(token, " test 1")
  //     console.log("on vas bientot verifier le token (users-service)")
  //     const token1: Token = await token.authorization.split(' ')[1];
  //     console.log(token1, " test 2")
  //     const decodedResponse = await this.authService.decodeToken(token1);
  //     console.log("le token est verifié (users-service)")
  //     switch (decodedResponse.role) {
  //       case 'commercial':
  //         return await this.userRepository.findBy({ role: 'commercial' })
  //       case 'admin':
  //         return await this.userRepository.find()
  //     }
  //   } catch (error) {
  //     throw new HttpException({ message: 'Error :' , error }, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  // @GrpcMethod('UsersService', 'getAllUsers')
  // async getAllUsers(token: any): Promise<Users[]> {
  //   try {
  //     console.log(`Token reçu dans users service: ${token}`);
  
  //     // Extrait le token si nécessaire
  //     const token1: Token = token.startsWith('Bearer ') ? token.split(' ')[1] : token;
  //     console.log(`Token extrait: ${token1}`);
  
  //     const decodedResponse = await this.authService.decodeToken(token1);
  //     console.log("Token décodé dans users service:", decodedResponse);

  //     switch (decodedResponse.role) {
  //       case 'commercial':
  //         return await this.userRepository.findBy({ role: 'commercial' });
  //       case 'admin':
  //         return await this.userRepository.find();
  //     }
  //   } catch (error) {
  //     console.error('Erreur dans users service: ', error);
  //     throw new HttpException({ message: 'Error :' , error }, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }
  @GrpcMethod('UsersService', 'getAllUsers')
  async getAllUsers(token: string): Promise<Users[]> {
    try {
      console.log(`Token reçu dans le service: ${token}`);
  
      const decodedToken = await this.authService.decodeToken(token);
      console.log("Token décodé dans le service: ", decodedToken);

      switch (decodedToken.role) {
        case 'commercial':
          return await this.userRepository.findBy({ role: 'commercial' });
        case 'admin':
          return await this.userRepository.find();
        default:
          throw new HttpException("Role non autorisé", HttpStatus.FORBIDDEN);
      }
    } catch (error) {
      console.error('Erreur dans users service: ', error);
      throw new HttpException({ message: 'Erreur :', error }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

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