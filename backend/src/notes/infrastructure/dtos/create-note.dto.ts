import { IsString, IsNotEmpty, IsOptional, IsEnum, IsArray } from 'class-validator';
import { NoteType } from '../../domain/entities/note.entity';

export class CreateNoteDto {
    @IsString()
    @IsNotEmpty()
    readonly title: string;

    @IsString()
    @IsNotEmpty()
    readonly content: string;

    @IsString()
    @IsNotEmpty()
    readonly createdBy: string;

    @IsEnum(NoteType)
    readonly type: NoteType;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    readonly sharedWith?: string[];
} 