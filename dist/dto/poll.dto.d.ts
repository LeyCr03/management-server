export declare class CreatePollDto {
    userId: string;
    header: string;
    description?: string;
    image?: string;
    choices: string[];
    created_at: Date;
    expiration: Date | null;
    topic: string;
    isArchived: boolean;
}
export declare class UpdatePollDto {
    isArchived: boolean;
    expiration: Date | null;
}
