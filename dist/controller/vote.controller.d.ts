import { VoteService } from "src/service/vote.service";
import { DecodedRequest } from "src/types";
export declare class VoteController {
    private readonly voteService;
    constructor(voteService: VoteService);
    createSub(req: DecodedRequest, pollId: string, choiceId: string): Promise<import("../entity/vote.entity").Vote>;
    deleteSub(id: string): Promise<{
        message: string;
    }>;
}
