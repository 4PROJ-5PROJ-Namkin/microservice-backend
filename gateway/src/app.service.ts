import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getHello(): string {
    return 'Hello World!';
  }

  async findById(id: string) {
    const user = id
    return user;
  }
}
