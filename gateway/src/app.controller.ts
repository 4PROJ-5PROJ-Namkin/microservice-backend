import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { AppService } from './app.service';
import { LoginUserDto, RegisterUserDto } from './gateway/auth.dto';

@Controller()
export class AppController {
  constructor(private httpService: HttpService) {}

  @Get('gateway/users')
  getAllUsers() {
    return this.httpService.get('http://localhost:3001/api/v1/users/')
      .pipe(map(response => response.data));
  }

  @Get('gateway/users/:id')
  getUserById(@Param('id') id: string) {
    return this.httpService.get(`http://localhost:3001/api/v1/users/${id}`)
      .pipe(map(response => response.data)); 
  }

  @Patch('users/:id')
  updateUserById(@Param('id') id: string, @Body() updateUserData: any) {
    return this.httpService.patch(`http://localhost:3001/api/v1/users/${id}`, updateUserData)
      .pipe(map(response => response.data));
  }

  @Delete('users/:id')
  deleteUserById(@Param('id') id: string) {
    return this.httpService.delete(`http://localhost:3001/api/v1/users/${id}`)
      .pipe(map(response => response.data));
  }

  @Post('register')
  createUser(@Body() userData: RegisterUserDto) {
    return this.httpService.post('http://localhost:3001/api/v1/register', userData)
      .pipe(map(response => response.data));
  }

  @Post('login')
  login(@Body() loginData: LoginUserDto) {
    return this.httpService.post('http://localhost:3001/api/v1/login', loginData)
      .pipe(map(response => response.data));
  }




  // @Get('gateway/production/:id')
  // getProductionById(@Param('id') id: string) {
  //   return this.httpService.get(`http://production-service-url/production/${id}`)
  //     .pipe(map(response => response.data));
  // }

}
