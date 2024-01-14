import { Body, Controller, Headers, Delete, Get, ParseIntPipe, Param, Patch, Post, HttpException, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs/operators';
import { LoginUserDto, RegisterUserDto } from './gateway/auth.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdateUsersDto } from './gateway/update-users.dto';
import { UpdateMaterialDto } from './gateway/update-material.dto';
import { CreateMaterialDto } from './gateway/create-material.dto';


@Controller()
export class AppController {
  constructor(private httpService: HttpService) { }

  // Users service
  @ApiBearerAuth('JWT-auth')
  @Get('gateway/users')
  @ApiOperation({ summary: 'Find all user' })
  @ApiResponse({ status: 401, description: 'Token is expired or invalid' })
  @ApiResponse({ status: 403, description: 'Forbidden resource' })
  @ApiResponse({ status: 500, description: 'Error finding users' })
  @UsePipes(new ValidationPipe({ transform: true }))
  getAllUsers(@Headers('authorization') authHeader: any) {
    return this.httpService.get('http://users-services-backend:3001/api/v1/users', {
      headers: { 'Authorization': authHeader },
    }).pipe(
      map(response => response.data),
      catchError(err => {
        if (err.response) {
          throw new HttpException(err.response.data, err.response.status);
        } else {
          throw new HttpException('Erreur de connexion au service', HttpStatus.SERVICE_UNAVAILABLE);
        }
      })
    );
  }
  

  @ApiBearerAuth('JWT-auth')
  @Get('gateway/users/:id')
  @ApiOperation({ summary: 'Find one user' })
  @ApiResponse({status: 401, description: 'unauthorized'})
  @ApiResponse({ status: 403, description: 'Forbidden resource' })
  @UsePipes(new ValidationPipe({ transform: true }))
  getUserById(@Headers('authorization') authHeader: any, @Param('id') id: string) {
    return this.httpService.get(`http://users-services-backend:3001/api/v1/users/${id}`, {
      headers: { 'Authorization': authHeader },
    }).pipe(
      map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  @ApiBearerAuth('JWT-auth')
  @Patch('gateway/users/:id')
  @ApiOperation({ summary: 'Update password' })
  @ApiResponse({status: 200, description: 'password updated',})
  @ApiResponse({status: 404, description: 'User not found.'})
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @UsePipes(new ValidationPipe({ transform: true }))
  updateUserById(@Body() userData: UpdateUsersDto, @Headers('authorization') authHeader: any, @Param('id') id: string) {
    return this.httpService.patch(`http://users-services-backend:3001/api/v1/users/${id}`, userData, {
      headers: { 'Authorization': authHeader },
    }).pipe(
      map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  @ApiBearerAuth('JWT-auth')
  @Delete('gateway/users/:id')
  @ApiOperation({ summary: 'delete one user' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @UsePipes(new ValidationPipe({ transform: true }))
  deleteUserById(@Headers('authorization') authHeader: any, @Param('id') id: string) {
    return this.httpService.delete(`http://users-services-backend:3001/api/v1/users/${id}`, {
      headers: { 'Authorization': authHeader },
    }).pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }


  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiResponse({ status: 401, description: 'User not found' })
  @ApiResponse({ status: 401, description: 'Error during token generation' })
  @ApiResponse({ status: 401, description: 'Wrong password' })
  @UsePipes(new ValidationPipe({ transform: true }))
  login(@Body() loginData: LoginUserDto) {
    return this.httpService.post('http://users-services-backend:3001/api/v1/login', loginData)
      .pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }


  @Post('register')
  @ApiResponse({ status: 400, description: 'User may already exist' })
  @ApiResponse({ status: 500, description: 'Error creating user' })
  @UsePipes(new ValidationPipe({ transform: true }))
  createUser(@Body() userData: RegisterUserDto) {
    return this.httpService.post('http://users-services-backend:3001/api/v1/register', userData)
      .pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  //----------------------------------------------
  // production service
  // Material
  @Get('gateway/materials')
  getAllMaterials() {
    return this.httpService.get('http://production-service-backend:3002/api/v1/materials').pipe(
      map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  @ApiBearerAuth('JWT-auth')
  @Get('gateway/material/:id')
  getMaterialById(@Headers('authorization') authHeader: any,@Param('id') id: number) {
    return this.httpService.get(`http://production-service-backend:3002/api/v1/materials/${id}`, {
      headers: { 'Authorization': authHeader },
    }).pipe(
      map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  @ApiBearerAuth('JWT-auth')
  @Patch('gateway/material/:id')
  updateMaterialById(@Body() materialData: UpdateMaterialDto) {
    return this.httpService.patch(`http://production-service-backend:3002/api/v1/materials/`, materialData).pipe(
      map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  @Post('gateway/materials/create')
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Material created' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Material already exists' })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error in creating material' })
  createMaterial(@Body() materialData: CreateMaterialDto) {
    return this.httpService.post('http://production-service-backend:3002/api/v1/materials/', materialData)
      .pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  
}