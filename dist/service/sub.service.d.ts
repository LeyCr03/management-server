import { Sub } from "src/entity/sub.entity";
import { User } from "src/entity/user.entity";
import { Repository } from "typeorm";
import { Poll } from "src/entity/poll.entity";
export declare class SubService {
    private readonly subRepository;
    private readonly userRepository;
    private readonly pollRepository;
    constructor(subRepository: Repository<Sub>, userRepository: Repository<User>, pollRepository: Repository<Poll>);
    findById(id: string): Promise<Sub | null>;
    createSub(userId: string, pollId: string): Promise<{
        message: string;
    }>;
    deleteSub(id: string): Promise<{
        message: string;
    }>;
}
