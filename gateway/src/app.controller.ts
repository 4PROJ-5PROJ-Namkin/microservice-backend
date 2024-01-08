import { Controller, Get, HttpException, Headers, HttpStatus, Inject, OnModuleInit, Body, Post, Param, Patch, Delete, UsePipes, ValidationPipe, Header, UseInterceptors } from '@nestjs/common';
import { ClientGrpc, Payload } from '@nestjs/microservices';
import * as grpc from '@grpc/grpc-js';
import { UpdateUsersDto } from 'generatedUserProto/user/UpdateUsersDto';
import { User } from 'generatedUserProto/user/User';
import { Empty } from 'generatedProductionProto/production/Empty';
import { Users } from 'generatedUserProto/user/Users';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HelloResponse } from 'generatedUserProto/user/HelloResponse';
import { LoginUserDto } from 'generatedUserProto/user/LoginUserDto';
import { Token } from 'generatedUserProto/user/Token';
import { RegisterUserDto } from 'generatedUserProto/user/RegisterUserDto';
import { Roles } from './guards/auth.decorator';
import { Role } from './guards/auth.enum';
import { HelloAuthResponse } from 'generatedAuthProto/auth/HelloAuthResponse';

interface UsersService {
  getHello(payload: any): Promise<HelloResponse>;
  getAllUsers(token: any): Promise<Users[]>;
  getUserById(authHeader: any,payload: { id: string }): Promise<User>;
  updateUser(authHeader: any,payload: UpdateUsersDto): Promise<User>;
  deleteUser(authHeader: any,payload: { id: string }): Promise<Empty>;
}

interface AuthService {
  getHelloAuth(payload: any): Promise<HelloAuthResponse>;
  login(Body: LoginUserDto): Promise<Token>;
  createCommercial(payload: RegisterUserDto): Promise<User>;
}

@Controller()
export class AppController implements OnModuleInit {
  private usersService : UsersService;
  private authService : AuthService;


  constructor(
    private readonly appService: AppService,
    @Inject('USERS_SERVICE') private userClient: ClientGrpc,
    @Inject('AUTH_SERVICE') private authClient: ClientGrpc,
  ) {}
  onModuleInit() {
    this.usersService = this.userClient.getService('UsersService');
    this.authService = this.authClient.getService('AuthService');
  }


  @Get('hello')
  async getHello() {
    try {
      return await this.usersService.getHello({});
    } catch (error) {
      console.error('Erreur :', error);
  
      switch (error.code) {
        case grpc.status.UNIMPLEMENTED:
          throw new HttpException("Méthode non implémentée", HttpStatus.NOT_IMPLEMENTED);
        case grpc.status.UNAVAILABLE:
          throw new HttpException("Service indisponible", HttpStatus.SERVICE_UNAVAILABLE);
        case grpc.status.PERMISSION_DENIED:
          throw new HttpException("Permission refusée", HttpStatus.FORBIDDEN);
        default:
          throw new HttpException("Erreur inconnue du serveur", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
  
  @Get('helloAuth')
  async getHelloAuth() {
    try {
      return await this.authService.getHelloAuth({});
    } catch (error) {
      console.error('Erreur :', error);
  
      switch (error.code) {
        case grpc.status.UNIMPLEMENTED:
          throw new HttpException("Méthode non implémentée", HttpStatus.NOT_IMPLEMENTED);
        case grpc.status.UNAVAILABLE:
          throw new HttpException("Service indisponible", HttpStatus.SERVICE_UNAVAILABLE);
        case grpc.status.PERMISSION_DENIED:
          throw new HttpException("Permission refusée", HttpStatus.FORBIDDEN);
        default:
          throw new HttpException("Erreur inconnue du serveur", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
  


  //   // Users service
  @ApiBearerAuth('JWT-auth')
  @Get('gateway/users')
  @Roles(Role.ADMIN) 
  @ApiOperation({ summary: 'Find all user' })
  @ApiResponse({ status: 401, description: 'Token is expired or invalid' })
  @ApiResponse({ status: 403, description: 'Forbidden resource' })
  @ApiResponse({ status: 500, description: 'Error finding users' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async getAllUsers(@Headers('authorization') authHeader: any): Promise<Users[]>  {
    try {
      const token = authHeader.split(' ')[1];
      console.log(authHeader, " app controller gateway")
      return await this.usersService.getAllUsers(token);
    } catch (error) {
      console.error('Erreur : ', error);
  
      switch (error.code) {
        case grpc.status.UNIMPLEMENTED:
          throw new HttpException("Méthode non implémentée", HttpStatus.NOT_IMPLEMENTED);
        case grpc.status.UNAVAILABLE:
          throw new HttpException("Service indisponible", HttpStatus.SERVICE_UNAVAILABLE);
        case grpc.status.PERMISSION_DENIED:
          throw new HttpException("Permission refusée", HttpStatus.FORBIDDEN);
        default:
          throw new HttpException("Erreur inconnue du serveur", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @ApiBearerAuth('JWT-auth')
  @Get('gateway/users/:id')
  async getUserById(@Headers('authorization') authHeader: any, @Param('id') id: string): Promise<User> {
    try {
      return await this.usersService.getUserById(id, authHeader);
    } catch (error) {
      console.error('', error);
      throw new HttpException('Erreur lors de la récupération de l utilisateur : ' +error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBearerAuth('JWT-auth')
  @Patch('gateway/users/:id')
  async updateUserById(updateUsersDto: UpdateUsersDto, @Param('id') id: string): Promise<User> {
    try {
      return await this.usersService.updateUser(id, updateUsersDto);
    } catch (error) {
      console.error('', error);
      throw new HttpException('echec de la mise a jour : '+error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBearerAuth('JWT-auth')
  @Delete('gateway/users/:id')
  deleteUserById(@Headers('authorization') authHeader: any,@Param('id') id: string, ) {
    try {
      return this.usersService.deleteUser(authHeader, { id });
    } catch (error) {
      console.error('', error);
      throw new HttpException('Erreur de suppression : ' + error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('login')
  async login(@Body() loginData: LoginUserDto): Promise<Token> {
    try {
       return await this.authService.login(loginData);
    } catch (error) {
      console.error('Erreur :', error);
  
      switch (error.code) {
        case grpc.status.UNIMPLEMENTED:
          throw new HttpException("Méthode non implémentée", HttpStatus.NOT_IMPLEMENTED);
        case grpc.status.UNAVAILABLE:
          throw new HttpException("Service indisponible", HttpStatus.SERVICE_UNAVAILABLE);
        case grpc.status.PERMISSION_DENIED:
          throw new HttpException("Permission refusée", HttpStatus.FORBIDDEN);
        default:
          throw new HttpException("Erreur inconnue du serveur", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Post('register')
  async createUser(@Body() userData: RegisterUserDto): Promise<User> {
    try {
      return await this.authService.createCommercial(userData);
    } catch (error) {
      console.error('', error);
      throw new HttpException('Erreur de creation du compte : '+error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
 
  // production service
  // Material


  // @ApiBearerAuth('JWT-auth')
  // @Post('gateway/material')
  // createMaterial(@Headers('authorization') authHeader: any, @Body() materialData: CreateMaterialDto) {
  //   return this.httpService.post(`http://localhost:3002/api/v1/materials`, materialData, {
  //     headers: { 'Authorization': authHeader },
  //   }).pipe(
  //     map(response => response.data),
  //     catchError(err => { 
  //       throw new HttpException(err.response.data, err.response.status);
  //     })
  //   );
  // }

// ↓
  // @Get('gateway/materials')
  // getAllMaterials() {
  //   try {
  //     return this.materialService.getMaterials().toPromise();
  //   } catch (error) {
  //     console.error('', error);
  //     throw new HttpException('Erreur de creation du compte : '+error, HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

//   @ApiBearerAuth('JWT-auth')
//   @Get('gateway/material/:id')
//   getMaterialById(@Headers('authorization') authHeader: any,@Param('id') id: number) {
//     return this.httpService.get(`http://localhost:3002/api/v1/materials/${id}`, {
//       headers: { 'Authorization': authHeader },
//     }).pipe(
//       map(response => response.data),
//       catchError(err => {
//         throw new HttpException(err.response.data, err.response.status);
//       })
//     );
//   }

//   // @ApiBearerAuth('JWT-auth')
//   // @Patch('gateway/material/:id')
//   // updateMaterialById(@Body() materialData: UpdateMaterialDto, @Param('id') id: number) {
//   //   return this.httpService.patch(`http://localhost:3002/api/v1/materials/${id}`, materialData).pipe(
      
//   //     map(response => response.data),
//   //     catchError(err => {
//   //       throw new HttpException(err.response.data, err.response.status);
//   //     })
//   //   );
//   // }

//   @ApiBearerAuth('JWT-auth')
//   @Delete('gateway/material/:id')
//   deleteMaterialByID(@Headers('authorization') authHeader: any,@Param('id') id: number) {
//     return this.httpService.delete(`http://localhost:3002/api/v1/materials/${id}`, {
//       headers: { 'Authorization': authHeader },
//     }).pipe(
//       map(response => response.data),
//       catchError(err => {
//         throw new HttpException(err.response.data, err.response.status);
//       })
//     );
//   }
// }


  
  // @ApiBearerAuth('JWT-auth')
  // @GrpcMethod('UserService', 'getAllUsers')
  // @Get('gateway/users')
  // async getAllUsers(@Headers('authorization') authHeader: string) {
  //     return this.userService.findAllUsers().get({
  //       headers: { 'Authorization': authHeader },
  //     }).pipe(
  //       map((response: any) => response.data),
  //       catchError(err => {
  //         throw new HttpException(err.response.data, err.response.status);
  //       })
  //     );
  //   }
  // @Post('login')
  // login1(@Body() loginData: LoginUserDto) {
  //   return this.httpService.post('http://localhost:3001/api/v1/login', loginData).pipe(map(response => response.data),
  //     catchError(err => {
  //       throw new HttpException(err.response.data, err.response.status);
  //     })
  //   );
  // }

  // @ApiBearerAuth('JWT-auth')
  // @Get('gateway/users')
  // getAllUsers(@Headers('authorization') authHeader: any) 
  //     return this.httpService.get('http://localhost:3001/api/v1/users', {
  //     headers: { 'Authorization': authHeader },
  //   }).pipe(map(response => response.data),
  //     catchError(err => {
  //       throw new HttpException(err.response.data, err.response.status);
  //     })
  //   );
  // }

  // @Get('users')
  // async getUsers() {
  //   return this.userService.getHello({ test: 'some_value' }).toPromise();
  // }
}



// import { Body, Controller, Headers, Delete, Get, ParseIntPipe, Param, Patch, Post, HttpException } from '@nestjs/common';
// import { HttpService } from '@nestjs/axios';
// import { catchError, map } from 'rxjs/operators';
// import { ApiBearerAuth } from '@nestjs/swagger';

// @Controller()
// export class AppController {
//   constructor(private httpService: HttpService) { }

//   // Users service
//   @ApiBearerAuth('JWT-auth')
//   @Get('gateway/users')
//   getAllUsers(@Headers('authorization') authHeader: any) {
//     return this.httpService.get('http://localhost:3001/api/v1/users', {
//       headers: { 'Authorization': authHeader },
//     }).pipe(
//       map(response => response.data),
//       catchError(err => {
//         throw new HttpException(err.response.data, err.response.status);
//       })
//     );
//   }

//   @ApiBearerAuth('JWT-auth')
//   @Get('gateway/users/:id')
//   getUserById(@Headers('authorization') authHeader: any, @Param('id') id: string) {
//     return this.httpService.get(`http://localhost:3001/api/v1/users/${id}`, {
//       headers: { 'Authorization': authHeader },
//     }).pipe(
//       map(response => response.data),
//       catchError(err => {
//         throw new HttpException(err.response.data, err.response.status);
//       })
//     );
//   }

//   @ApiBearerAuth('JWT-auth')
//   @Patch('gateway/users/:id')
//   updateUserById(@Body() userData: UpdateUsersDto, @Headers('authorization') authHeader: any, @Param('id') id: string) {
//     return this.httpService.patch(`http://localhost:3001/api/v1/users/${id}`, userData, {
//       headers: { 'Authorization': authHeader },
//     }).pipe(
//       map(response => response.data),
//       catchError(err => {
//         throw new HttpException(err.response.data, err.response.status);
//       })
//     );
//   }

//   @Delete('gateway/users/:id')
//   deleteUserById(@Headers('authorization') authHeader: any, @Param('id') id: number) {
//     return this.httpService.delete(`http://localhost:3001/api/v1/users/${id}`, {
//       headers: { 'Authorization': authHeader },
//     }).pipe(map(response => response.data),
//       catchError(err => {
//         throw new HttpException(err.response.data, err.response.status);
//       })
//     );
//   }


//   @Post('login')
//   login(@Body() loginData: LoginUserDto) {
//     return this.httpService.post('http://localhost:3001/api/v1/login', loginData)
//       .pipe(map(response => response.data),
//       catchError(err => {
//         throw new HttpException(err.response.data, err.response.status);
//       })
//     );
//   }


//   @Post('register')
//   createUser(@Body() userData: RegisterUserDto) {
//     return this.httpService.post('http://localhost:3001/api/v1/register', userData)
//       .pipe(map(response => response.data),
//       catchError(err => {
//         throw new HttpException(err.response.data, err.response.status);
//       })
//     );
//   }

  
//   @ApiBearerAuth('JWT-auth')
//   @Post('register/admin')
//   createUserAdmin(@Body() userData: RegisterUserDto) {
//     return this.httpService.post('http://localhost:3001/api/v1/register/admin', userData)
//       .pipe(map(response => response.data),
//       catchError(err => {
//         throw new HttpException(err.response.data, err.response.status);
//       })
//     );
//   }

//   //----------------------------------------------
//   // production service
//   // Material

//   // @ApiBearerAuth('JWT-auth')
//   // @Post('gateway/material')
//   // createMaterial(@Headers('authorization') authHeader: any, @Body() materialData: CreateMaterialDto) {
//   //   return this.httpService.post(`http://localhost:3002/api/v1/materials`, materialData, {
//   //     headers: { 'Authorization': authHeader },
//   //   }).pipe(
//   //     map(response => response.data),
//   //     catchError(err => { 
//   //       throw new HttpException(err.response.data, err.response.status);
//   //     })
//   //   );
//   // }
//   @Get('gateway/materials')
//   getAllMaterials() {
//     return this.httpService.get('http://localhost:3002/api/v1/materials').pipe(
//       map(response => response.data),
//       catchError(err => {
//         throw new HttpException(err.response.data, err.response.status);
//       })
//     );
//   }

//   @ApiBearerAuth('JWT-auth')
//   @Get('gateway/material/:id')
//   getMaterialById(@Headers('authorization') authHeader: any,@Param('id') id: number) {
//     return this.httpService.get(`http://localhost:3002/api/v1/materials/${id}`, {
//       headers: { 'Authorization': authHeader },
//     }).pipe(
//       map(response => response.data),
//       catchError(err => {
//         throw new HttpException(err.response.data, err.response.status);
//       })
//     );
//   }

//   // @ApiBearerAuth('JWT-auth')
//   // @Patch('gateway/material/:id')
//   // updateMaterialById(@Body() materialData: UpdateMaterialDto, @Param('id') id: number) {
//   //   return this.httpService.patch(`http://localhost:3002/api/v1/materials/${id}`, materialData).pipe(
      
//   //     map(response => response.data),
//   //     catchError(err => {
//   //       throw new HttpException(err.response.data, err.response.status);
//   //     })
//   //   );
//   // }

//   @ApiBearerAuth('JWT-auth')
//   @Delete('gateway/material/:id')
//   deleteMaterialByID(@Headers('authorization') authHeader: any,@Param('id') id: number) {
//     return this.httpService.delete(`http://localhost:3002/api/v1/materials/${id}`, {
//       headers: { 'Authorization': authHeader },
//     }).pipe(
//       map(response => response.data),
//       catchError(err => {
//         throw new HttpException(err.response.data, err.response.status);
//       })
//     );
//   }
// }