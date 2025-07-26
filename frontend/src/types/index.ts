// User types
export interface User {
    id: string;
    email: string;
    name: string;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
}

// Note types
export interface Note {
    id: string;
    title: string;
    content: string;
    isShared: boolean;
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    tags?: string[];
    color?: string;
}

// Task types
export interface Task {
    id: string;
    title: string;
    description?: string;
    isCompleted: boolean;
    priority: 'low' | 'medium' | 'high';
    dueDate?: Date;
    createdAt: Date;
    updatedAt: Date;
    isShared: boolean;
    createdBy: string;
    tags?: string[];
    assignee?: string;
}

// Calendar Event types
export interface CalendarEvent {
    id: string;
    title: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    isAllDay: boolean;
    location?: string;
    attendees?: string[];
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    isShared: boolean;
    color?: string;
    recurrence?: RecurrenceRule;
}

export interface RecurrenceRule {
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;
    endDate?: Date;
    count?: number;
}

// API Response types
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    limit: number;
    hasNext: boolean;
    hasPrev: boolean;
}

// Form types
export interface NoteFormData {
    title: string;
    content: string;
    isShared: boolean;
    tags?: string[];
    color?: string;
}

export interface TaskFormData {
    title: string;
    description?: string;
    priority: 'low' | 'medium' | 'high';
    dueDate?: Date;
    isShared: boolean;
    tags?: string[];
    assignee?: string;
}

export interface EventFormData {
    title: string;
    description?: string;
    startDate: Date;
    endDate: Date;
    isAllDay: boolean;
    location?: string;
    attendees?: string[];
    isShared: boolean;
    color?: string;
    recurrence?: RecurrenceRule;
}

// Filter and Sort types
export interface FilterOptions {
    search?: string;
    tags?: string[];
    dateRange?: {
        start: Date;
        end: Date;
    };
    priority?: 'low' | 'medium' | 'high';
    status?: 'active' | 'completed' | 'all';
    shared?: boolean;
}

export interface SortOptions {
    field: string;
    direction: 'asc' | 'desc';
}

// Navigation types
export interface NavItem {
    path: string;
    label: string;
    icon: string;
    badge?: number;
}

// Theme types
export interface Theme {
    name: string;
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
}

// Notification types
export interface Notification {
    id: string;
    type: 'info' | 'success' | 'warning' | 'error';
    title: string;
    message: string;
    timestamp: Date;
    read: boolean;
    action?: {
        label: string;
        url: string;
    };
}

// Settings types
export interface UserSettings {
    theme: string;
    language: string;
    timezone: string;
    notifications: {
        email: boolean;
        push: boolean;
        sms: boolean;
    };
    privacy: {
        shareByDefault: boolean;
        allowSharing: boolean;
    };
} 