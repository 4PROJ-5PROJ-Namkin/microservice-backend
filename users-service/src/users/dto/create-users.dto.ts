import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword, Length } from "class-validator";

export class CreateUsersDto {

    @IsNotEmpty()
    @IsString()
    @Length(2, 25)
    @ApiProperty({
        description: 'First name',
        example: "Rudy",
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
        example: "rudy.turpin@supinfo.com",
        type: String
    })
    readonly email: string;

    @IsNotEmpty()
    @IsPhoneNumber()
    @ApiProperty({
        description: 'email',
        example: "rudy.turpin@supinfo.com",
        type: String
    })
    readonly telephoneNumber: string;
  
    @IsNotEmpty()
    @IsStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
    @ApiProperty({
        description: 'password',
        example: "ajfr51!fjbe",
        type: String
    })
    readonly password: string;
}
