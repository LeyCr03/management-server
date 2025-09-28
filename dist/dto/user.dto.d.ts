export declare class CreateUserDto {
    name: string;
    password: string;
    profileImage?: string;
    email: string;
}
export declare class UpdateUserDto {
    name?: string;
    password?: string;
    profileImage?: string;
    email?: string;
}
export declare class CreateUserResponse {
    id: string;
    name: string;
    email: string;
    profileImage?: string;
}
