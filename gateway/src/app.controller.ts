import { Controller, Get, Param } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';

@Controller()
export class AppController {
  constructor(private httpService: HttpService) {}

  @Get('gateway/users')
  getAllUsers() {
    return this.httpService.get('http://localhost:3001/users')
      .pipe(map(response => response.data));
  }

  @Get('gateway/users/:id')
  getUserById(@Param('id') id: string) {
    return this.httpService.get(`http://localhost:3001/users/${id}`)
      .pipe(map(response => response.data)); 
  }

  @Get('gateway/production/:id')
  getProductionById(@Param('id') id: string) {
    return this.httpService.get(`http://production-service-url/production/${id}`)
      .pipe(map(response => response.data));
  }
}
