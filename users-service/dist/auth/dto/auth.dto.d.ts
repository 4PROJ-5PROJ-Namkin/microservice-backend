export declare class LoginUserDto {
    readonly email: string;
    readonly password: string;
}
export declare class RegisterUserDto {
    readonly first_name: string;
    readonly last_name: string;
    readonly email: string;
    readonly telephoneNumber: string;
    readonly password: string;
}
export declare class Token {
    readonly token: string;
}
export declare class TokenStructure {
    readonly id: string;
    readonly role: string;
}
