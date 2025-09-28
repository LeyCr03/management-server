import { User } from "src/entity/user.entity";
import { UserService } from "src/service/user.service";
import { Repository } from "typeorm";
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from "src/dto/user.dto";
import { DecodedRequest, UserResponse } from "src/types";
import { LoginDto } from "./auth.dto";
export declare class AuthService {
    private readonly userRepository;
    private userService;
    private jwtService;
    constructor(userRepository: Repository<User>, userService: UserService, jwtService: JwtService);
    register(createUserDto: CreateUserDto): Promise<UserResponse>;
    validateUser(email: string, password: string): Promise<any>;
    login(user: LoginDto & {
        id: string;
    }): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    refreshTokens(req: DecodedRequest): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(user_id: string): Promise<void>;
}
