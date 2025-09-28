import { User } from './user.entity';
import { Poll } from './poll.entity';
export declare class Sub {
    id: string;
    subscribed_at: Date;
    userId: string;
    pollId: string;
    user: User;
    poll: Poll;
}
