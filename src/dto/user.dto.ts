import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, IsUrl, MinLength } from 'class-validator';

export class CreateUserDto {

    @ApiProperty({
        description: 'Name',
        example: 'John Doe',
    })
    @IsString()
    name: string

    @ApiProperty({
        description: 'Password',
        example: 'Saf3Pa5w0rd',
    })
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string

    @ApiProperty({
        description: 'Profile Image Url',
        example: 'https://example.com/image.jpg',
    })
    @IsString()
    @IsOptional()
    profileImage?: string


    @ApiProperty({
        description: 'Email',
        example: 'name@example.com',
    })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email: string
}

export class UpdateUserDto {
    @ApiProperty({
        description: 'Name',
        example: 'John Doe',
    })
    @IsString()
    @IsOptional()
    name?: string

    @ApiProperty({
        description: 'Password',
        example: 'Saf3Pa5w0rd',
    })
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @IsOptional()
    password?: string

    @ApiProperty({
        description: 'Profile Image Url',
        example: 'https://example.com/image.jpg',
    })
    @IsString()
    @IsUrl()
    @IsOptional()
    profileImage?: string


    @ApiProperty({
        description: 'Email',
        example: 'name@example.com',
    })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    @IsOptional()
    email?: string

}

export class CreateUserResponse {
    @ApiProperty({ example: 'user-id' })
    id: string;

    @ApiProperty({ example: 'John Doe' })
    name: string

    @ApiProperty({ example: 'user@example.com' })
    email: string;

    @ApiProperty({
        example: 'https://example.com/image.jpg',
    })
    profileImage?: string

}

