const argon2 = require('argon2');
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Token, LoginUserDto, RegisterUserDto } from "./dto/auth.dto";
import { DecodeToken, GenerateToken } from "./utils/jwt";
import Users from "src/users/entities/users.entity";
import { GrpcMethod } from "@nestjs/microservices";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) { }


  @GrpcMethod('AuthService', 'login')
  async login(loginData: LoginUserDto): Promise<Token> {
    const user = await this.usersRepository.findOne({ where: { email: loginData.email }, select: ['id', 'password', 'role'] });

    if (!user)
      throw new HttpException({ message: 'User not found' }, HttpStatus.BAD_REQUEST);

    if (await argon2.verify(user.password, loginData.password)) {
      try {
        return await GenerateToken({ id: user.id, role: user.role })
      } catch (error) {
        throw new HttpException({ message: 'Error during token generation' }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } else {
      throw new HttpException({ message: 'Wrong password' }, HttpStatus.BAD_REQUEST);
    }
  }

  @GrpcMethod('AuthService', 'createUser')
  async createCommercial(user: RegisterUserDto) {

    if (await this.usersRepository.findOneBy({ email: user.email }) || await this.usersRepository.findOneBy({ email: user.email }))
      throw new HttpException({ message: 'User may already exist' }, HttpStatus.BAD_REQUEST);

    const customerData = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      telephoneNumber: user.telephoneNumber,
      password: await argon2.hash(user.password),
      role: 'commercial'
    }

    try {
      await this.usersRepository.save(this.usersRepository.create(customerData))
    } catch (error) {
      throw new HttpException({ message: 'Error creating user' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  
  async createAdmin(user: RegisterUserDto, headers: any) {

      const token: Token = await headers.authorization.split(' ')[1];
      const decoded = await DecodeToken(token);

      if (decoded.role === 'commercial') {
        throw new HttpException({ message: 'You are not allowed to access this resource' }, HttpStatus.UNAUTHORIZED);
      }

      if (decoded.role === 'admin') {
        if (await this.usersRepository.findOneBy({ email: user.email }) || await this.usersRepository.findOneBy({ email: user.email }))
          throw new HttpException({ message: 'User may already exist' }, HttpStatus.BAD_REQUEST);

        const adminData = {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          telephoneNumber: user.telephoneNumber,
          password: await argon2.hash(user.password),
          role: 'admin'
        }

        try {
          await this.usersRepository.save(this.usersRepository.create(adminData))
        } catch (error) {
          throw new HttpException({ message: 'Error creating user' }, HttpStatus.INTERNAL_SERVER_ERROR);
        }

      }
    }
}