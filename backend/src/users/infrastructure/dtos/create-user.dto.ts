import { IsString, IsNotEmpty, IsOptional, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    googleId: string;

    @IsOptional()
    @IsString()
    picture?: string;
} 