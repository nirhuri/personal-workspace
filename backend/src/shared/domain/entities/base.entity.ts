export abstract class BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    version: number;

    constructor(id?: string) {
        this.id = id || this.generateId();
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.version = 1;
    }

    updateVersion(): void {
        this.version++;
        this.updatedAt = new Date();
    }

    private generateId(): string {
        return `${this.constructor.name.toLowerCase()}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

}