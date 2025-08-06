import { BaseEntity } from "@/shared/domain/entities/base.entity";

export enum NoteType {
    PERSONAL = 'PERSONAL',
    SHARED = 'SHARED',
}

export enum NoteStatus {
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED',
    ARCHIVED = 'ARCHIVED',
}

export class Note extends BaseEntity {
    private _content: string;
    private _title: string;
    private _status: NoteStatus;
    private _type: NoteType;
    private _sharedWith: string[];

    constructor(
        id: string,
        public readonly createdBy: string,
        title: string,
        content: string,
        type: NoteType,
        status: NoteStatus,
        sharedWith: string[] = []
    ) {
        super(id);
        this._title = title;
        this._content = content;
        this._type = type;
        this._status = status;
        this._sharedWith = sharedWith;
    }

    get title(): string {
        return this._title;
    }

    get content(): string {
        return this._content;
    }

    get status(): NoteStatus {
        return this._status;
    }

    get type(): NoteType {
        return this._type;
    }

    get sharedWith(): string[] {
        return [...this._sharedWith];
    }

    static create(
        createdBy: string,
        title: string,
        content: string,
        type: NoteType = NoteType.PERSONAL,
        sharedWith: string[] = []
    ): Note {
        return new Note(
            this.generateId(),
            createdBy,
            title,
            content,
            type,
            NoteStatus.DRAFT,
            sharedWith
        );
    }

    updateContent(newContent: string): void {
        this._content = newContent;
        this.updateVersion();
    }

    updateTitle(newTitle: string): void {
        this._title = newTitle;
        this.updateVersion();
    }

    publish(): void {
        if (this.status !== NoteStatus.DRAFT) {
            throw new Error('Only draft notes can be published');
        }
        this._status = NoteStatus.PUBLISHED;
        this.updateVersion();
    }

    archive(): void {
        if (this.status === NoteStatus.ARCHIVED) {
            throw new Error('Note is already archived');
        }
        this._status = NoteStatus.ARCHIVED;
        this.updateVersion();
    }

    shareWith(userId: string): void {
        if (this.type !== NoteType.SHARED) {
            throw new Error('Only shared notes can be shared with users');
        }
        if (!this._sharedWith.includes(userId)) {
            this._sharedWith.push(userId);
            this.updateVersion();
        }
    }

    removeShare(userId: string): void {
        if (this.type !== NoteType.SHARED) {
            throw new Error('Only shared notes can have shared users removed');
        }
        const index = this._sharedWith.indexOf(userId);
        if (index > -1) {
            this._sharedWith.splice(index, 1);
            this.updateVersion();
        }
    }

    canAccess(userId: string): boolean {
        return this.createdBy === userId || this._sharedWith.includes(userId);
    }

    private static generateId(): string {
        return `note_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    }
}