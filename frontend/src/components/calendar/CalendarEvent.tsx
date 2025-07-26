import React from 'react';
import Badge from '../ui/Badge';
import Icon from '../ui/Icon';
import { CalendarEvent as CalendarEventType } from '../../types';

interface CalendarEventProps {
    event: CalendarEventType;
    onEdit?: (event: CalendarEventType) => void;
    onDelete?: (eventId: string) => void;
}

const CalendarEvent: React.FC<CalendarEventProps> = ({ event, onEdit, onDelete }) => {
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('he-IL', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatDate = (date: Date) => {
        const now = new Date();
        const eventDate = new Date(date);
        const diffTime = eventDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'היום';
        if (diffDays === 1) return 'מחר';
        if (diffDays < 7) return `בעוד ${diffDays} ימים`;
        return eventDate.toLocaleDateString('he-IL');
    };

    const getEventColor = (eventType?: string) => {
        switch (eventType) {
            case 'meeting': return 'primary';
            case 'call': return 'success';
            case 'planning': return 'info';
            default: return 'secondary';
        }
    };

    const getGradientClass = (eventType?: string) => {
        switch (eventType) {
            case 'meeting': return 'from-blue-50 to-indigo-50 border-blue-400';
            case 'call': return 'from-green-50 to-emerald-50 border-green-400';
            case 'planning': return 'from-purple-50 to-violet-50 border-purple-400';
            default: return 'from-gray-50 to-gray-100 border-gray-400';
        }
    };

    const getEventType = (title: string) => {
        if (title.includes('צוות')) return 'meeting';
        if (title.includes('לקוח')) return 'call';
        if (title.includes('תכנון')) return 'planning';
        return 'default';
    };

    const eventType = getEventType(event.title);

    return (
        <div className={`p-4 bg-gradient-to-r ${getGradientClass(eventType)} border-l-4 rounded-xl hover:shadow-md transition-shadow`}>
            <div className="flex items-center">
                <div className={`flex-shrink-0 w-3 h-3 bg-${eventType === 'meeting' ? 'blue' : eventType === 'call' ? 'green' : 'purple'}-500 rounded-full mr-4`}></div>
                <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-1">{event.title}</h4>
                    {event.description && (
                        <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                    )}
                    <div className="flex items-center text-xs text-gray-500">
                        <Icon name="time" size="sm" className="mr-1" />
                        {formatDate(event.startDate)}, {formatTime(event.startDate)} - {formatTime(event.endDate)}
                    </div>
                    {event.location && (
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                            📍 {event.location}
                        </div>
                    )}
                </div>
                <div className="flex items-center space-x-2">
                    <Badge
                        variant={getEventColor(eventType)}
                        size="sm"
                    >
                        {formatDate(event.startDate)}
                    </Badge>
                </div>
            </div>
        </div>
    );
};

export default CalendarEvent; 