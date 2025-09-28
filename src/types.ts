
export interface DecodedRequest {
    user: {
        _id: string,
        email: string,
        password: string,
        refreshToken: string
    }
}
export enum Sex {
  MALE = 'male',
  FEMALE = 'female',
}

export enum Status {
    ACTIVE = 'active',
    SUSPENDED = 'suspended',
}

export type AgeRange = '18-25' | '25-35' | '35-45' | '45-70';

export type UserResponse = {
    id: string
    email: string,
    image?: string | null,
    name: string,
}

export type UserTokenResponse = {
    id: string
    email: string,
    image?: string | null,
    name: string,
    refreshTokenHash: string | null
}

export type AccountResponse = {
    id: string
    name: string,
    birth: Date,
    age: number,
    sex: Sex,
    registered_at: Date,
    status: Status,
    last_payment: Date,
    frequency: Date[]
}
