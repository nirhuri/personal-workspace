import React from 'react';
import PageHeader from '../components/layout/PageHeader';
import CalendarEvent from '../components/calendar/CalendarEvent';
import Card from '../components/ui/Card';
import { CalendarEvent as CalendarEventType } from '../types';

const Calendar: React.FC = () => {
    // Mock data - בהמשך זה יבוא מה-API
    const mockEvents: CalendarEventType[] = [
        {
            id: '1',
            title: 'פגישת צוות',
            description: 'דיון על התקדמות הפרויקט',
            startDate: new Date(Date.now() + 3600000),
            endDate: new Date(Date.now() + 7200000),
            isAllDay: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            isShared: false,
            createdBy: 'user1'
        },
        {
            id: '2',
            title: 'שיחת לקוח',
            description: 'סקירת דרישות חדשות',
            startDate: new Date(Date.now() + 86400000),
            endDate: new Date(Date.now() + 86400000 + 3600000),
            isAllDay: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            isShared: false,
            createdBy: 'user1'
        },
        {
            id: '3',
            title: 'פגישת תכנון',
            description: 'תכנון פיצ\'רים חדשים',
            startDate: new Date(Date.now() + 259200000),
            endDate: new Date(Date.now() + 259200000 + 3600000),
            isAllDay: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            isShared: false,
            createdBy: 'user1'
        }
    ];

    const handleAddEvent = () => {
        console.log('Add event clicked');
        // בהמשך זה יפתח מודל להוספת אירוע
    };

    const handleEventEdit = (event: CalendarEventType) => {
        console.log('Edit event:', event);
        // בהמשך זה יפתח מודל לעריכת אירוע
    };

    const handleEventDelete = (eventId: string) => {
        console.log('Delete event:', eventId);
        // בהמשך זה ימחק את האירוע
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <PageHeader
                    title="יומן"
                    subtitle="נהל את האירועים שלך"
                    actionLabel="אירוע חדש"
                    actionVariant="warning"
                    onAction={handleAddEvent}
                />

                <Card className="p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                        <h2 className="text-xl font-semibold text-gray-800">דצמבר 2024</h2>
                        <div className="flex space-x-2">
                            <button className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">היום</button>
                            <button className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">שבוע</button>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md">חודש</button>
                        </div>
                    </div>

                    {/* לוח שנה */}
                    <div className="grid grid-cols-7 gap-1 mb-8">
                        {/* ימי השבוע */}
                        {['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'].map((day) => (
                            <div key={day} className="p-3 text-center text-sm font-medium text-gray-500 bg-gray-50 rounded-lg">
                                {day}
                            </div>
                        ))}

                        {/* ימים ריקים */}
                        {Array.from({ length: 1 }, (_, i) => (
                            <div key={`empty-${i}`} className="p-3"></div>
                        ))}

                        {/* ימי החודש */}
                        {Array.from({ length: 31 }, (_, i) => {
                            const day = i + 1;
                            const hasEvent = [3, 7, 15, 22, 28].includes(day);
                            const isToday = day === 15;

                            return (
                                <div
                                    key={day}
                                    className={`p-3 text-center text-sm border border-gray-200 min-h-[80px] rounded-lg hover:bg-gray-50 transition-colors cursor-pointer ${isToday ? 'bg-blue-50 border-blue-300 text-blue-700 font-semibold' : ''
                                        }`}
                                >
                                    <div className="font-medium text-gray-900 mb-2">{day}</div>
                                    {hasEvent && (
                                        <div className="flex justify-center">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* אירועים קרובים */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">אירועים קרובים</h3>
                        <div className="space-y-4">
                            {mockEvents.map((event) => (
                                <CalendarEvent
                                    key={event.id}
                                    event={event}
                                    onEdit={handleEventEdit}
                                    onDelete={handleEventDelete}
                                />
                            ))}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Calendar; 