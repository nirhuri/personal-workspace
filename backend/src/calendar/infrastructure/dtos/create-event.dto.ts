import { IsString, IsNotEmpty, IsOptional, IsDateString, IsBoolean, IsArray, ArrayMaxSize, MaxLength, MinLength, IsEnum } from 'class-validator';

export enum RecurrenceFrequencyDto {
    NONE = 'NONE',
    DAILY = 'DAILY',
    WEEKLY = 'WEEKLY',
    MONTHLY = 'MONTHLY',
    YEARLY = 'YEARLY'
}

export class RecurrenceRuleDto {
    @IsEnum(RecurrenceFrequencyDto)
    frequency: RecurrenceFrequencyDto;

    @IsNotEmpty()
    interval: number;

    @IsOptional()
    @IsDateString()
    endDate?: string;

    @IsOptional()
    count?: number;
}

export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(200)
    title: string;

    @IsOptional()
    @IsString()
    @MaxLength(1000)
    description?: string;

    @IsNotEmpty()
    @IsDateString()
    startDate: string;

    @IsNotEmpty()
    @IsDateString()
    endDate: string;

    @IsBoolean()
    isAllDay: boolean;

    @IsOptional()
    @IsString()
    @MaxLength(200)
    location?: string;

    @IsArray()
    @ArrayMaxSize(50)
    @IsString({ each: true })
    attendees: string[];

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    createdBy: string;

    @IsBoolean()
    isShared: boolean;

    @IsOptional()
    @IsString()
    color?: string;

    @IsOptional()
    recurrence?: RecurrenceRuleDto;
} 