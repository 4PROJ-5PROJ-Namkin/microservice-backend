import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsJWT, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword, IsUUID, Length } from "class-validator";

export class LoginUserDto {

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    description: 'email',
    example: "rudy.turpin@gmail.com",
    type: String
})
  readonly email: string;

  @IsNotEmpty()
  @IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
  @ApiProperty({
    description: 'password',
    example: "1Afhs985!cw",
    type: String
})
  readonly password: string;

}

export class RegisterUserDto {

  @IsNotEmpty()
    @IsString()
    @Length(2, 25)
    @ApiProperty({
      description: 'first name',
      example: "rudy",
      type: String
  })
    readonly first_name: string;
  
    @IsNotEmpty()
    @IsString()
    @Length(2, 25)
    @ApiProperty({
      description: 'Last name',
      example: "turpin",
      type: String
  })
    readonly last_name: string;
  
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({
      description: 'email',
      example: "rudy.turpin@gmail.com",
      type: String
  })
    readonly email: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    @ApiProperty({
      description: 'telephone number',
      example: "+33608070545",
      type: String
  })
    readonly telephoneNumber: string;
  
    @IsNotEmpty()
    @IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
    @ApiProperty({
      description: 'password',
      example: "1Afhs985!cw",
      type: String
  })
    readonly password: string;

}

export class Token {

  @IsNotEmpty()
  @IsJWT()
  readonly token: string;

}

export class TokenStructure {

  @IsNotEmpty()
  @IsUUID()
  readonly id: string;

  @IsNotEmpty()
  @IsString()
  readonly role: string;

}