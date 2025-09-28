import { User } from './user.entity';
import { Sub } from './sub.entity';
import { Topic } from './topic.entity';
import { Comment } from './comment.entity';
import { Vote } from './vote.entity';
import { Choice } from './choices.entity';
export declare class Poll {
    id: string;
    userId: string;
    user: User;
    header: string;
    description?: string | null;
    image?: string | null;
    choices: Choice[];
    created_at: Date;
    expiration: Date | null;
    isArchived: boolean;
    subs: Sub[];
    topic: Topic;
    comments: Comment[];
    votes: Vote[];
}
