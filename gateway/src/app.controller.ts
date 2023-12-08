import { Body, Controller, Headers, Delete, Get, ParseIntPipe, Param, Patch, Post, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs/operators';
import { LoginUserDto, RegisterUserDto } from './gateway/auth.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UpdateUsersDto } from './gateway/update-users.dto';

@ApiBearerAuth('JWT-auth')
@Controller()
export class AppController {
  constructor(private httpService: HttpService) { }

  // Users service
  @Get('gateway/users')
  getAllUsers(@Headers('authorization') authHeader: any) {
    return this.httpService.get('http://localhost:3001/api/v1/users', {
      headers: { 'Authorization': authHeader },
    }).pipe(
      map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  @Get('gateway/users/:id')
  getUserById(@Headers('authorization') authHeader: any, @Param('id') id: string) {
    return this.httpService.get(`http://localhost:3001/api/v1/users/${id}`, {
      headers: { 'Authorization': authHeader },
    }).pipe(
      map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  @Patch('gateway/users/:id')
  updateUserById(@Body() userData: UpdateUsersDto, @Headers('authorization') authHeader: any, @Param('id') id: string) {
    return this.httpService.patch(`http://localhost:3001/api/v1/users/${id}`, userData, {
      headers: { 'Authorization': authHeader },
    }).pipe(
      map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  @Delete('gateway/users/:id')
  deleteUserById(@Headers('authorization') authHeader: any, @Param('id') id: string) {
    return this.httpService.delete(`http://localhost:3001/api/v1/users/${id}`, {
      headers: { 'Authorization': authHeader },
    }).pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  @Post('register')
  createUser(@Body() userData: RegisterUserDto) {
    return this.httpService.post('http://localhost:3001/api/v1/register', userData)
      .pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }

  @Post('login')
  login(@Body() loginData: LoginUserDto) {
    return this.httpService.post('http://localhost:3001/api/v1/login', loginData)
      .pipe(map(response => response.data),
      catchError(err => {
        throw new HttpException(err.response.data, err.response.status);
      })
    );
  }


  //----------------------------------------------
  // production service
  // Material
  @Get('gateway/production/:materialId')
  getMaterialPrices(@Param('materialId', ParseIntPipe) materialId: number) {
    return this.httpService.get('http://localhost:3002/api/v1/materials')
      .pipe(map(response => response.data),
        catchError(err => {
          throw new HttpException(err.response.data, err.response.status);
        })
      );
  }
}