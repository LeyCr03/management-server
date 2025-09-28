import { Poll } from './poll.entity';
import { Sub } from './sub.entity';
import { Comment } from './comment.entity';
import { Vote } from './vote.entity';
import { Choice } from './choices.entity';
export declare class User {
    id: string;
    email: string;
    profileImage: string | null;
    name: string;
    description: string;
    password: string;
    refreshTokenHash?: string | null;
    polls: Poll[];
    subs: Sub[];
    choices: Choice[];
    comments: Comment[];
    votes: Vote[];
}
