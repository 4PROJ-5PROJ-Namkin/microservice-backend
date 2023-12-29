import { Controller, Get, HttpException, Headers, HttpStatus, Inject, OnModuleInit, Body, Post, Param, Patch, Delete } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientGrpc } from '@nestjs/microservices';
import { ApiBearerAuth } from '@nestjs/swagger';
import { HelloResponse } from 'generatedUserProto/user/HelloResponse';
import { UsersResponse } from 'generatedUserProto/user/UsersResponse';
import { UpdateUsersDto } from 'generatedUserProto/user/UpdateUsersDto';
import { LoginUserDto } from 'generatedUserProto/user/LoginUserDto';
import { LoginResponse } from 'generatedUserProto/user/LoginResponse';
import { RegisterUserDto } from 'generatedUserProto/user/RegisterUserDto';


@Controller()
export class AppController implements OnModuleInit {
  private usersService;
  private authService;
  private materialService;


  constructor(
    private readonly appService: AppService,
    @Inject('USERS_SERVICE') private userClient: ClientGrpc,
    @Inject('PRODUCTION_SERVICE') private productionClient: ClientGrpc,
  ) {}
  onModuleInit() {
    this.usersService = this.userClient.getService('UsersService');
    this.authService = this.userClient.getService('AuthService');
    this.materialService = this.productionClient.getService('MaterialService');
  }


  @Get('hello')
  async getHello(): Promise <HelloResponse>{
    try {
      return await this.usersService.getHello({}).toPromise();
    } catch (error) {
      console.error('Erreur gRPC :', error);
      throw new HttpException(" "+error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

    // Users service

  @ApiBearerAuth('JWT-auth')
  @Get('gateway/users')
  async getAllUsers(@Headers('authorization') authHeader: any): Promise<UsersResponse[]>  {
    try {
      return await this.usersService.findAllUsers(authHeader).toPromise();
    } catch (error) {
      console.error('', error);
      throw new HttpException('Erreur lors de la récupération des utilisateurs : '+error , HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBearerAuth('JWT-auth')
  @Get('gateway/users/:id')
  async getUserById(@Headers('authorization') authHeader: any, @Param('id') id: string): Promise<UsersResponse> {
    try {
      return await this.usersService.findById(id, authHeader).toPromise();
    } catch (error) {
      console.error('', error);
      throw new HttpException('Erreur lors de la récupération de l utilisateur : ' +error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBearerAuth('JWT-auth')
  @Patch('gateway/users/:id')
  async updateUserById(updateUsersDto: UpdateUsersDto, @Param('id') id: string) {
    try {
      return await this.usersService.updatePassword(id, updateUsersDto).toPromise();
    } catch (error) {
      console.error('', error);
      throw new HttpException('echec de la mise a jour : '+error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiBearerAuth('JWT-auth')
  @Delete('gateway/users/:id')
  deleteUserById(@Param('id') id: string) {
    try {
      return this.usersService.remove(id).toPromise();
    } catch (error) {
      console.error('', error);
      throw new HttpException('Erreur de suppression : ' + error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('login')
  async login(@Body() loginData: LoginUserDto): Promise<LoginResponse> {
    try {
      const response: LoginResponse = await this.authService.login(loginData).toPromise();
      return response; 
    } catch (error) {
      console.error('', error);
      throw new HttpException('Erreur de connexion : ' +error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('register')
  createUser(@Body() userData: RegisterUserDto) {
    try {
      return this.usersService.createCommercial(userData).toPromise();
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


  @Get('gateway/materials')
  getAllMaterials() {
    try {
      return this.materialService.getMaterials().toPromise();
    } catch (error) {
      console.error('', error);
      throw new HttpException('Erreur de creation du compte : '+error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

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