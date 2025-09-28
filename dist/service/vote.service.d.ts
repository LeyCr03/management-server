import { Repository } from "typeorm";
import { Vote } from "src/entity/vote.entity";
export declare class VoteService {
    private readonly voteRepository;
    constructor(voteRepository: Repository<Vote>);
    findById(id: string): Promise<Vote | null>;
    createVote(userId: string, pollId: string, choiceId: string): Promise<Vote>;
    deleteVote(id: string): Promise<{
        message: string;
    }>;
}
