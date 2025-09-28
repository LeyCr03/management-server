import { Poll } from "src/entity/poll.entity";
import { User } from "src/entity/user.entity";
import { Repository } from "typeorm";
import { PollResponse, UserId, UserPollsResponse, UserResponse } from 'src/types';
import { Sub } from "src/entity/sub.entity";
import { UpdateUserDto } from "src/dto/user.dto";
import { Vote } from "src/entity/vote.entity";
export declare class UserService {
    private readonly userRepository;
    private readonly pollRepository;
    private readonly subRepository;
    private readonly voteRepository;
    constructor(userRepository: Repository<User>, pollRepository: Repository<Poll>, subRepository: Repository<Sub>, voteRepository: Repository<Vote>);
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    getUserById(id: string): Promise<UserResponse | null>;
    getUserByEmail(email: string): Promise<UserResponse | null>;
    updateRefreshTokenHash(userId: UserId, refreshTokenHash: string | null): Promise<void>;
    getUserWithRefreshTokenHash(userId: UserId): Promise<User | null>;
    isUserSubscribed(userId: string, pollId: string): Promise<boolean>;
    getUserPolls(userId: UserId): Promise<UserPollsResponse[]>;
    getUserSubs(userId: UserId): Promise<PollResponse[]>;
    getSubscriptionCount(userId: UserId): Promise<number>;
    getVotesCount(userId: UserId): Promise<number>;
    deleteUser(id: string): Promise<{
        message: string;
    }>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<{
        message: string;
    }>;
}
