// Navigation constants
export const NAV_ITEMS = [
    { path: '/', label: 'Dashboard', icon: '🏠' },
    { path: '/notes', label: 'Notes', icon: '📝' },
    { path: '/tasks', label: 'Tasks', icon: '✅' },
    { path: '/calendar', label: 'Calendar', icon: '📅' },
];

// Priority options
export const PRIORITY_OPTIONS = [
    { value: 'low', label: 'Low', color: 'blue' },
    { value: 'medium', label: 'Medium', color: 'orange' },
    { value: 'high', label: 'High', color: 'red' },
];

// Task status options
export const TASK_STATUS_OPTIONS = [
    { value: 'active', label: 'Active', color: 'green' },
    { value: 'completed', label: 'Done', color: 'gray' },
    { value: 'all', label: 'All', color: 'blue' },
];

// Event types
export const EVENT_TYPES = [
    { value: 'meeting', label: 'Meeting', color: 'blue' },
    { value: 'call', label: 'Call', color: 'green' },
    { value: 'planning', label: 'Planning', color: 'purple' },
    { value: 'other', label: 'Other', color: 'gray' },
];

// Recurrence frequencies
export const RECURRENCE_FREQUENCIES = [
    { value: 'daily', label: 'Calendar' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
];

// Color options for notes and events
export const COLOR_OPTIONS = [
    { value: 'blue', label: 'Blue', hex: '#3B82F6' },
    { value: 'green', label: 'Green', hex: '#10B981' },
    { value: 'yellow', label: 'Yellow', hex: '#F59E0B' },
    { value: 'red', label: 'Red', hex: '#EF4444' },
    { value: 'purple', label: 'Purple', hex: '#8B5CF6' },
    { value: 'pink', label: 'Pink', hex: '#EC4899' },
    { value: 'gray', label: 'Gray', hex: '#6B7280' },
];

// Date formats
export const DATE_FORMATS = {
    short: 'DD/MM/YYYY',
    long: 'DD/MM/YYYY HH:mm',
    time: 'HH:mm',
    relative: 'relative',
};

// Local storage keys
export const STORAGE_KEYS = {
    USER: 'user',
    TOKEN: 'token',
    REFRESH_TOKEN: 'refreshToken',
    SETTINGS: 'settings',
    THEME: 'theme',
    LANGUAGE: 'language',
    SIDEBAR_COLLAPSED: 'sidebarCollapsed',
};

// Validation rules
export const VALIDATION_RULES = {
    TITLE_MIN_LENGTH: 1,
    TITLE_MAX_LENGTH: 100,
    CONTENT_MIN_LENGTH: 1,
    CONTENT_MAX_LENGTH: 1000,
    DESCRIPTION_MAX_LENGTH: 500,
    TAGS_MAX_COUNT: 10,
    TAGS_MAX_LENGTH: 20,
};

// Pagination
export const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 20,
    MAX_LIMIT: 100,
};

// Time intervals (in milliseconds)
export const TIME_INTERVALS = {
    SECOND: 1000,
    MINUTE: 60 * 1000,
    HOUR: 60 * 60 * 1000,
    DAY: 24 * 60 * 60 * 1000,
    WEEK: 7 * 24 * 60 * 60 * 1000,
    MONTH: 30 * 24 * 60 * 60 * 1000,
    YEAR: 365 * 24 * 60 * 60 * 1000,
};

// Error messages
export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network error. Please check your connection.',
    UNAUTHORIZED: 'You do not have permission to perform this action.',
    FORBIDDEN: 'This action is forbidden.',
    NOT_FOUND: 'The requested item was not found.',
    VALIDATION_ERROR: 'The entered data is invalid.',
    SERVER_ERROR: 'Server error. Please try again later.',
    UNKNOWN_ERROR: 'Unknown error. Please try again.',
};

// Success messages
export const SUCCESS_MESSAGES = {
    NOTE_CREATED: 'Note created successfully.',
    NOTE_UPDATED: 'Note updated successfully.',
    NOTE_DELETED: 'Note deleted successfully.',
    TASK_CREATED: 'Task created successfully.',
    TASK_UPDATED: 'Task updated successfully.',
    TASK_DELETED: 'Task deleted successfully.',
    EVENT_CREATED: 'Event created successfully.',
    EVENT_UPDATED: 'Event updated successfully.',
    EVENT_DELETED: 'Event deleted successfully.',
    SETTINGS_SAVED: 'Settings saved successfully.',
};