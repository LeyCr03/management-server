export interface DecodedRequest {
    user: {
        user_id: string;
        email: string;
        password: string;
        refreshToken: string;
    };
}
export type UserId = string;
export interface PollResponse {
    pollId: string;
    userId: string;
    userImage: string | null;
    username: string;
    header: string;
    description: string | null;
    created_at: Date;
    image: string | null;
    choices: string[];
    expiration: Date | null;
    topic: string;
    isArchived: boolean;
    comments: number;
    subs: number;
}
export interface UserPollsResponse {
    pollId: string;
    userId: string;
    header: string;
    description: string | null;
    created_at: Date;
    image: string | null;
    choices: string[];
    expiration: Date | null;
    isArchived: boolean;
    topic: string;
    comments: number;
    subs: number;
}
export type UserResponse = {
    id: string;
    email: string;
    profileImage?: string | null;
    description: string;
    name: string;
};
export interface GetPollMetricsResponse {
    pollId: string;
    total: number;
    userVote: number | null;
    useSubscribed: boolean;
    options: {
        value: string;
        ammount: number;
    }[];
}
