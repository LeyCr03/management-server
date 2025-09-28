import { Poll } from './poll.entity';
import { User } from './user.entity';
export declare class Comment {
    id: string;
    userName: string;
    userImage?: string;
    userId: string;
    pollId: string;
    comment: string;
    poll: Poll;
    user: User;
}
