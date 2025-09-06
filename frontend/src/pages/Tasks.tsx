import React from 'react';
import PageHeader from '../components/layout/PageHeader';
import TaskItem from '../components/tasks/TaskItem';
import Card from '../components/ui/Card';
import { Task } from '../types';

const Tasks: React.FC = () => {
    const mockActiveTasks: Task[] = [
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
        },
        {
            id: '3',
            title: 'עדכון תיעוד',
            description: 'לעדכן את התיעוד של הפרויקט',
            isCompleted: false,
            dueDate: new Date(Date.now() + 259200000),
            priority: 'low',
            createdAt: new Date(),
            updatedAt: new Date(),
            isShared: false,
            createdBy: 'user1'
        }
    ];

    const mockCompletedTasks: Task[] = [
        {
            id: '4',
            title: 'הגדרת פרויקט',
            description: 'הגדרת הפרויקט הראשוני',
            isCompleted: true,
            dueDate: new Date(Date.now() - 86400000),
            priority: 'high',
            createdAt: new Date(Date.now() - 172800000),
            updatedAt: new Date(Date.now() - 86400000),
            isShared: false,
            createdBy: 'user1'
        },
        {
            id: '5',
            title: 'התקנת Tailwind',
            description: 'התקנה והגדרה של Tailwind CSS',
            isCompleted: true,
            dueDate: new Date(),
            priority: 'medium',
            createdAt: new Date(Date.now() - 86400000),
            updatedAt: new Date(),
            isShared: false,
            createdBy: 'user1'
        }
    ];

    const handleAddTask = () => {
        console.log('Add task clicked');
        // בהמשך זה יפתח מודל להוספת משימה
    };

    const handleTaskToggle = (taskId: string, completed: boolean) => {
        console.log('Task toggled:', taskId, completed);
        // בהמשך זה יעדכן את המשימה
    };

    const handleTaskEdit = (task: Task) => {
        console.log('Edit task:', task);
        // בהמשך זה יפתח מודל לעריכת משימה
    };

    const handleTaskDelete = (taskId: string) => {
        console.log('Delete task:', taskId);
        // בהמשך זה ימחק את המשימה
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <PageHeader
                    title="משימות"
                    subtitle="נהל את המשימות שלך"
                    actionLabel="משימה חדשה"
                    actionVariant="success"
                    onAction={handleAddTask}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* משימות פעילות */}
                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">משימות פעילות</h2>
                            <span className="text-2xl">✅</span>
                        </div>
                        <div className="space-y-4">
                            {mockActiveTasks.map((task) => (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    onToggle={handleTaskToggle}
                                    onEdit={handleTaskEdit}
                                    onDelete={handleTaskDelete}
                                />
                            ))}
                        </div>
                    </Card>

                    {/* משימות שהושלמו */}
                    <Card className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-800">הושלמו</h2>
                            <span className="text-2xl">🎉</span>
                        </div>
                        <div className="space-y-4">
                            {mockCompletedTasks.map((task) => (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    onToggle={handleTaskToggle}
                                    onEdit={handleTaskEdit}
                                    onDelete={handleTaskDelete}
                                />
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Tasks; 