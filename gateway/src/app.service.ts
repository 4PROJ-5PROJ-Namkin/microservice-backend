import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  async getHelloGateway(): Promise <string> {
    return 'Je suis dans la gateway ';
  }
  
}
