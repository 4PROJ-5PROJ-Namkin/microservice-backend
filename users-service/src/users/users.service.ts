const argon2 = require('argon2');
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { UpdateUsersDto } from './dto/update-users.dto';
import { Token } from 'src/auth/dto/auth.dto';
import { DecodeToken } from 'src/auth/utils/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) { }

  async findAllUsers(headers: any): Promise<Users[]> {
    const token: Token = await headers.authorization.split(' ')[1];
    const decoded = await DecodeToken(token);

    try {
      switch (decoded.role) {
        case 'commercial':
          return await this.usersRepository.findBy({ role: 'commercial' })
        case 'admin':
          return await this.usersRepository.find()
      }
    } catch (error) {
      throw new HttpException({ message: 'Error finding users' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findById(id: string, headers: any): Promise<Users> {

    const token: Token = await headers.authorization.split(' ')[1];
    const decoded = await DecodeToken(token);

    if (decoded.role === 'commercial' && decoded.id !== id) {
      throw new HttpException({ message: 'You are not allowed to access this resource' }, HttpStatus.UNAUTHORIZED);
    }

    if (decoded.id === id) {
      const user = await this.usersRepository.findOneBy({ id })
      if (!user)
        throw new HttpException({ message: 'User not found' }, HttpStatus.NOT_FOUND);
      else
        return user;
    }

    if (decoded.role === 'commercial') {
      const user = await this.usersRepository.findOneBy({ id, role: 'commercial' })
      if (!user)
        throw new HttpException({ message: 'User not found' }, HttpStatus.NOT_FOUND);
      else
        return user;
    }

    if (decoded.role === 'admin') {
      const user = await this.usersRepository.findOneBy({ id })
      if (!user)
        throw new HttpException({ message: 'User not found' }, HttpStatus.NOT_FOUND);
      else
        return user;

    }
  }

  async updatePassword(id: string, updatePasswordUserDto: UpdateUsersDto) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user)
      throw new HttpException({ message: 'User not found.' }, HttpStatus.NOT_FOUND);
    else {
      const userData = {
        password: await argon2.hash(updatePasswordUserDto.password),
      }
      return await this.usersRepository.update({ id }, userData);
    }
  }


  async remove(id: string) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user)
      throw new HttpException({ message: 'User not found.' }, HttpStatus.NOT_FOUND);
    else
      return await this.usersRepository.delete({ id });
  }
}