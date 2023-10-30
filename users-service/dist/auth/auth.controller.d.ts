import { AuthService } from "./auth.service";
import { Token, LoginUserDto, RegisterUserDto } from "./dto/auth.dto";
export declare class LoginController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginData: LoginUserDto): Promise<Token>;
}
export declare class RegisterController {
    private readonly authService;
    constructor(authService: AuthService);
    createCommercial(userData: RegisterUserDto): Promise<void>;
    createAdmin(userData: RegisterUserDto): Promise<void>;
}
