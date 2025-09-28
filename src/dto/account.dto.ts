import { IsArray, IsDate, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Sex, Status } from "src/types";

export class CreateAccountDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsDate()
    birth: Date

    @IsNotEmpty()
    @IsNumber()
    age: number

    @IsNotEmpty()
    @IsEnum(Sex, { message: 'sex must be either "male" or "female"' })
    sex: Sex

    @IsNotEmpty()
    @IsDate()
    registered_at: Date

}

export class UpdateAccountDto {

    @IsString()
    @IsOptional()
    name?: string;

    @IsEnum(Status)
    @IsOptional()
    status: Status

}