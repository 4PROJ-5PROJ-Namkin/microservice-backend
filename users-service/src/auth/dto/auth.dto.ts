import { IsEmail, IsJWT, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword, IsUUID, Length } from "class-validator";

export class LoginUserDto {

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
  readonly password: string;

}

export class RegisterUserDto {

  @IsNotEmpty()
    @IsString()
    @Length(2, 25)
    readonly first_name: string;
  
    @IsNotEmpty()
    @IsString()
    @Length(2, 25)
    readonly last_name: string;
  
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    readonly telephoneNumber: string;
  
    @IsNotEmpty()
    @IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
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