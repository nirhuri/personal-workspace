import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Icon from '../ui/Icon';
import { CalendarEvent } from '../../types';
import { formatTime, getRelativeDate } from '../../services/date.service';

interface UpcomingEventsProps {
    events: CalendarEvent[];
    onEventClick?: (event: CalendarEvent) => void;
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events, onEventClick }) => {
    const getEventColor = (title: string) => {
        if (title.includes('צוות')) return 'primary';
        if (title.includes('לקוח')) return 'success';
        if (title.includes('תכנון')) return 'info';
        return 'secondary';
    };

    const getGradientClass = (title: string) => {
        if (title.includes('צוות')) return 'from-blue-50 to-indigo-50 border-blue-200';
        if (title.includes('לקוח')) return 'from-green-50 to-emerald-50 border-green-200';
        if (title.includes('תכנון')) return 'from-purple-50 to-violet-50 border-purple-200';
        return 'from-gray-50 to-gray-100 border-gray-200';
    };

    return (
        <Card className="p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Upcoming Meetings</h2>
                <span className="text-2xl">📅</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {events.map((event) => (
                    <div
                        key={event.id}
                        onClick={() => onEventClick?.(event)}
                        className={`p-4 bg-gradient-to-r ${getGradientClass(event.title)} border rounded-xl hover:shadow-md transition-all duration-200 cursor-pointer`}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold text-gray-800">{event.title}</h3>
                            <Badge
                                variant={getEventColor(event.title)}
                                size="sm"
                            >
                                {getRelativeDate(event.startDate)}
                            </Badge>
                        </div>
                        {event.description && (
                            <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                        )}
                        <div className="flex items-center text-xs text-gray-500">
                            <Icon name="time" size="sm" className="mr-1" />
                            {formatTime(event.startDate)} - {formatTime(event.endDate)}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default UpcomingEvents; 