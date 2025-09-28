import { User } from "src/entity/user.entity";
import { Repository } from "typeorm";
import { UpdateUserDto } from "src/dto/user.dto";
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    updateRefreshTokenHash(userId: string, refreshTokenHash: string | null): Promise<void>;
    getUserWithRefreshTokenHash(userId: string): Promise<User | null>;
    deleteUser(id: string): Promise<{
        message: string;
    }>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<{
        message: string;
    }>;
}
