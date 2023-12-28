import { Controller, Get, HttpException, Headers, HttpStatus, Inject, OnModuleInit, Body, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiBearerAuth } from '@nestjs/swagger';
import { LoginRequest } from './../generated/user/LoginRequest';
import { LoginResponse } from './../generated/user/LoginResponse';
// import { UserServiceClient } from './../generated/user/UserService'; 
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class AppController implements OnModuleInit {
  private userService;
  // private loginData;
  // private authService;
  constructor(
    private readonly appService: AppService,
    @Inject('USERS_SERVICE') private client: ClientGrpc,
  ) {}
  onModuleInit() {
    this.userService = this.client.getService('UserService');
    // this.loginData = this.client.getService('LoginUserDto');
    // this.authService = this.client.getService('AuthService');
  }

  @GrpcMethod('UserService', 'getHello')
  @Get('hello')
  async getHello(): Promise<{ message: string }> {
    try {
      return await this.userService.getHelloTest().toPromise();
    } catch (error) {
      console.error('Erreur gRPC :', error);
      throw new HttpException(" "+error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

    // Users service
  
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
  @ApiBearerAuth('JWT-auth')
  @Get('gateway/users')
  async getAllUsers(@Headers('authorization') authHeader: string) {
    try {
      return await this.userService.getAllUsers({}).toPromise();
    } catch (error) {
      console.error('Erreur gRPC :', error);
      throw new HttpException('Erreur lors de la récupération des utilisateurs', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  

  @Post('login')
  async login(@Body() loginData: LoginRequest): Promise<LoginResponse> {
    try {
      const response: LoginResponse = await this.userService.login(loginData).toPromise();
      return response; 
    } catch (error) {
      console.error('Erreur gRPC lors du login :', error);
      throw new HttpException('Erreur lors de la connexion', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

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
  // getAllUserss(@Headers('authorization') authHeader: any) 
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