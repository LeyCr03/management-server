import { AuthService } from './auth.service';
import { TokensDto } from './auth.dto';
import { CreateUserDto } from 'src/dto/user.dto';
import { UserResponse } from 'src/types';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<UserResponse>;
    login(req: any): Promise<TokensDto>;
    refreshTokens(req: any): Promise<TokensDto>;
    logout(req: any): Promise<{
        message: string;
    }>;
}
