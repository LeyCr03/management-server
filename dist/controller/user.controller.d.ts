import { UserService } from '../service/user.service';
import { DecodedRequest, PollResponse, UserPollsResponse, UserResponse } from 'src/types';
import { UpdateUserDto } from 'src/dto/user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUserSubs(req: DecodedRequest): Promise<PollResponse[]>;
    getUserPolls(req: DecodedRequest): Promise<UserPollsResponse[]>;
    findById(req: DecodedRequest): Promise<UserResponse | null>;
    findbyEmail(req: DecodedRequest): Promise<UserResponse | null>;
    getSubscribers(): Promise<void>;
    delete(req: DecodedRequest): Promise<{
        message: string;
    }>;
    update(req: DecodedRequest, updateUserDto: UpdateUserDto): Promise<{
        message: string;
    }>;
}
