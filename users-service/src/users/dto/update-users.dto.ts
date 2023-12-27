import { PartialType } from '@nestjs/mapped-types';
import { CreateUsersDto} from './create-users.dto';
import { IsNotEmpty, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class UpdateUsersDto extends PartialType(CreateUsersDto) {
  @IsNotEmpty()
  @IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
  @ApiProperty({
    description: 'password',
    example: "1Afhs985!cw",
    type: String
})
  readonly password: string;

  // @IsNotEmpty()
  // @IsString()
  // readonly last_name: string;

  // @IsNotEmpty()
  // @IsString()
  // readonly first_name: string;

  // @IsNotEmpty()
  // @IsString()
  // readonly email: string;

  // @IsNotEmpty()
  // @IsNumber()
  // @IsPhoneNumber()
  // readonly telephoneNumber: string;
}
