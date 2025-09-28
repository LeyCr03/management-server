import { User } from "./user.entity";
import { Poll } from "./poll.entity";
import { Choice } from "./choices.entity";
export declare class Vote {
    id: string;
    userId: string;
    pollId: string;
    choiceId: string;
    user: User;
    poll: Poll;
    choice: Choice;
}
