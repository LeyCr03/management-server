import { UserService } from '../service/user.service';
import { DecodedRequest } from 'src/types';
import { UpdateUserDto } from 'src/dto/user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    delete(req: DecodedRequest): Promise<{
        message: string;
    }>;
    update(req: DecodedRequest, updateUserDto: UpdateUserDto): Promise<{
        message: string;
    }>;
}
