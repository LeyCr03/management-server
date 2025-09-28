import { Poll } from "src/entity/poll.entity";
import { User } from "src/entity/user.entity";
import { Vote } from "./vote.entity";
export declare class Choice {
    id: string;
    userId: string;
    content: string;
    votes: Vote[];
    user: User;
    poll: Poll;
}
