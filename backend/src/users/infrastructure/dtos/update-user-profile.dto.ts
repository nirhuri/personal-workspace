import { IsString, IsOptional, MinLength, IsUrl } from 'class-validator';

export class UpdateUserProfileDto {
    @IsOptional()
    @IsString()
    @MinLength(1)
    name?: string;

    @IsOptional()
    @IsString()
    @IsUrl()
    picture?: string;
} 