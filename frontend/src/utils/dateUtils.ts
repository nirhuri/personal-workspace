export const formatDate = (date: Date): string => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'היום';
    if (diffDays === 1) return 'אתמול';
    if (diffDays < 7) return `לפני ${diffDays} ימים`;
    return date.toLocaleDateString('he-IL');
};

export const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('he-IL', {
        hour: '2-digit',
        minute: '2-digit'
    });
};

export const formatDateTime = (date: Date): string => {
    return `${formatDate(date)}, ${formatTime(date)}`;
};

export const getRelativeDate = (date: Date): string => {
    const now = new Date();
    const eventDate = new Date(date);
    const diffTime = eventDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'היום';
    if (diffDays === 1) return 'מחר';
    if (diffDays < 7) return `בעוד ${diffDays} ימים`;
    return eventDate.toLocaleDateString('he-IL');
};

export const isToday = (date: Date): boolean => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
};

export const isPast = (date: Date): boolean => {
    return date < new Date();
};

export const isFuture = (date: Date): boolean => {
    return date > new Date();
}; 