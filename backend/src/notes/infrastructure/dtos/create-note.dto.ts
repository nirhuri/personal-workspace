import { IsString, IsNotEmpty, IsOptional, IsEnum, IsArray } from 'class-validator';
import { NoteType } from '../../domain/entities/note.entity';

export class CreateNoteDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsEnum(NoteType)
    type: NoteType;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    sharedWith?: string[];
} 