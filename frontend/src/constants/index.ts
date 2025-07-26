// Navigation constants
export const NAV_ITEMS = [
    { path: '/', label: 'דשבורד', icon: '🏠' },
    { path: '/notes', label: 'פתקים', icon: '📝' },
    { path: '/tasks', label: 'משימות', icon: '✅' },
    { path: '/calendar', label: 'יומן', icon: '📅' },
];

// Priority options
export const PRIORITY_OPTIONS = [
    { value: 'low', label: 'נמוך', color: 'blue' },
    { value: 'medium', label: 'בינוני', color: 'orange' },
    { value: 'high', label: 'גבוה', color: 'red' },
];

// Task status options
export const TASK_STATUS_OPTIONS = [
    { value: 'active', label: 'פעיל', color: 'green' },
    { value: 'completed', label: 'הושלם', color: 'gray' },
    { value: 'all', label: 'הכל', color: 'blue' },
];

// Event types
export const EVENT_TYPES = [
    { value: 'meeting', label: 'פגישה', color: 'blue' },
    { value: 'call', label: 'שיחה', color: 'green' },
    { value: 'planning', label: 'תכנון', color: 'purple' },
    { value: 'other', label: 'אחר', color: 'gray' },
];

// Recurrence frequencies
export const RECURRENCE_FREQUENCIES = [
    { value: 'daily', label: 'יומי' },
    { value: 'weekly', label: 'שבועי' },
    { value: 'monthly', label: 'חודשי' },
    { value: 'yearly', label: 'שנתי' },
];

// Color options for notes and events
export const COLOR_OPTIONS = [
    { value: 'blue', label: 'כחול', hex: '#3B82F6' },
    { value: 'green', label: 'ירוק', hex: '#10B981' },
    { value: 'yellow', label: 'צהוב', hex: '#F59E0B' },
    { value: 'red', label: 'אדום', hex: '#EF4444' },
    { value: 'purple', label: 'סגול', hex: '#8B5CF6' },
    { value: 'pink', label: 'ורוד', hex: '#EC4899' },
    { value: 'gray', label: 'אפור', hex: '#6B7280' },
];

// Date formats
export const DATE_FORMATS = {
    short: 'DD/MM/YYYY',
    long: 'DD/MM/YYYY HH:mm',
    time: 'HH:mm',
    relative: 'relative',
};

// API endpoints
export const API_ENDPOINTS = {
    // Auth
    LOGIN: '/auth/google',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',

    // Notes
    NOTES: '/notes',
    NOTE: (id: string) => `/notes/${id}`,
    NOTE_SHARE: (id: string) => `/notes/${id}/share`,

    // Tasks
    TASKS: '/tasks',
    TASK: (id: string) => `/tasks/${id}`,
    TASK_TOGGLE: (id: string) => `/tasks/${id}/toggle`,
    TASK_SHARE: (id: string) => `/tasks/${id}/share`,

    // Events
    EVENTS: '/events',
    EVENT: (id: string) => `/events/${id}`,
    EVENT_SHARE: (id: string) => `/events/${id}/share`,

    // Users
    USERS: '/users',
    USER: (id: string) => `/users/${id}`,
    USER_PROFILE: '/users/profile',
    USER_SETTINGS: '/users/settings',

    // Search
    SEARCH: '/search',

    // Notifications
    NOTIFICATIONS: '/notifications',
    NOTIFICATION: (id: string) => `/notifications/${id}`,
    NOTIFICATION_READ: (id: string) => `/notifications/${id}/read`,
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
    NETWORK_ERROR: 'שגיאת רשת. אנא בדוק את החיבור שלך.',
    UNAUTHORIZED: 'אין לך הרשאה לבצע פעולה זו.',
    FORBIDDEN: 'פעולה זו אסורה.',
    NOT_FOUND: 'הפריט המבוקש לא נמצא.',
    VALIDATION_ERROR: 'הנתונים שהוזנו אינם תקינים.',
    SERVER_ERROR: 'שגיאת שרת. אנא נסה שוב מאוחר יותר.',
    UNKNOWN_ERROR: 'שגיאה לא ידועה. אנא נסה שוב.',
};

// Success messages
export const SUCCESS_MESSAGES = {
    NOTE_CREATED: 'הפתק נוצר בהצלחה.',
    NOTE_UPDATED: 'הפתק עודכן בהצלחה.',
    NOTE_DELETED: 'הפתק נמחק בהצלחה.',
    TASK_CREATED: 'המשימה נוצרה בהצלחה.',
    TASK_UPDATED: 'המשימה עודכנה בהצלחה.',
    TASK_DELETED: 'המשימה נמחקה בהצלחה.',
    EVENT_CREATED: 'האירוע נוצר בהצלחה.',
    EVENT_UPDATED: 'האירוע עודכן בהצלחה.',
    EVENT_DELETED: 'האירוע נמחק בהצלחה.',
    SETTINGS_SAVED: 'ההגדרות נשמרו בהצלחה.',
}; 