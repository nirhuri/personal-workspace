import React from 'react';
import RecentNotes from '../components/dashboard/RecentNotes';
import RecentTasks from '../components/dashboard/RecentTasks';
import UpcomingEvents from '../components/dashboard/UpcomingEvents';
import { Note, Task, CalendarEvent } from '../types';

const Dashboard: React.FC = () => {
    // Mock data - בהמשך זה יבוא מה-API
    const mockNotes: Note[] = [
        {
            id: '1',
            title: 'פגישה עם הלקוח',
            content: 'דיון על דרישות הפרויקט החדש. צריך להכין מצגת עם האפשרויות השונות ולבדוק את התקציב.',
            createdAt: new Date(),
            updatedAt: new Date(),
            isShared: false,
            createdBy: 'user1'
        },
        {
            id: '2',
            title: 'רעיונות לפיצ\'רים',
            content: 'רשימת רעיונות לפיתוח האפליקציה: אינטגרציה עם Slack, התראות מתקדמות, תמיכה ב-dark mode.',
            createdAt: new Date(Date.now() - 86400000),
            updatedAt: new Date(Date.now() - 86400000),
            isShared: true,
            createdBy: 'user1'
        }
    ];

    const mockTasks: Task[] = [
        {
            id: '1',
            title: 'השלמת דף הפתקים',
            description: 'להשלים את הפונקציונליות של דף הפתקים',
            isCompleted: false,
            dueDate: new Date(Date.now() + 86400000),
            priority: 'high',
            createdAt: new Date(),
            updatedAt: new Date(),
            isShared: false,
            createdBy: 'user1'
        },
        {
            id: '2',
            title: 'בדיקת באגים',
            description: 'לבדוק ולתקן באגים ידועים',
            isCompleted: false,
            dueDate: new Date(Date.now() + 604800000),
            priority: 'medium',
            createdAt: new Date(),
            updatedAt: new Date(),
            isShared: false,
            createdBy: 'user1'
        }
    ];

    const mockEvents: CalendarEvent[] = [
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

    const handleNoteClick = (note: Note) => {
        console.log('Note clicked:', note);
        // בהמשך זה ינווט לדף הפתקים
    };

    const handleTaskToggle = (taskId: string, completed: boolean) => {
        console.log('Task toggled:', taskId, completed);
        // בהמשך זה יעדכן את המשימה
    };

    const handleTaskClick = (task: Task) => {
        console.log('Task clicked:', task);
        // בהמשך זה ינווט לדף המשימות
    };

    const handleEventClick = (event: CalendarEvent) => {
        console.log('Event clicked:', event);
        // בהמשך זה ינווט לדף היומן
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* כותרת ראשית */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Welcome!</h1>
                    <p className="text-gray-600">Here is an overview of your day</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <RecentNotes
                        notes={mockNotes}
                        onNoteClick={handleNoteClick}
                    />
                    <RecentTasks
                        tasks={mockTasks}
                        onTaskToggle={handleTaskToggle}
                        onTaskClick={handleTaskClick}
                    />
                    <UpcomingEvents
                        events={mockEvents}
                        onEventClick={handleEventClick}
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 