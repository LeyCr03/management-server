import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, MinLength } from "class-validator"

export class LoginDto {

    @ApiProperty({
        description: 'Email',
        example: 'name@example.com',
    })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email: string

    @ApiProperty({
        description: 'Password',
        example: 'Saf3Pa5w0rd',
    })
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string
}

export class TokensDto {
    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
    @IsString()
    accessToken: string;

    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
    @IsString()
    refreshToken: string;
}

export class RefreshTokenDto {
    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
    @IsString()
    refreshToken: string;
}