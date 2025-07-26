import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Task } from '../../types';

interface RecentTasksProps {
    tasks: Task[];
    onTaskToggle?: (taskId: string, completed: boolean) => void;
    onTaskClick?: (task: Task) => void;
}

const RecentTasks: React.FC<RecentTasksProps> = ({ tasks, onTaskToggle, onTaskClick }) => {
    const formatDate = (date: Date) => {
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'היום';
        if (diffDays === 1) return 'מחר';
        if (diffDays < 7) return `עד: ${diffDays} ימים`;
        return `עד: ${date.toLocaleDateString('he-IL')}`;
    };

    const getPriorityColor = (priority: Task['priority']) => {
        switch (priority) {
            case 'high': return 'danger';
            case 'medium': return 'warning';
            case 'low': return 'info';
            default: return 'secondary';
        }
    };

    const getGradientClass = (priority: Task['priority']) => {
        switch (priority) {
            case 'high': return 'from-green-50 to-emerald-50 border-green-400';
            case 'medium': return 'from-orange-50 to-amber-50 border-orange-400';
            case 'low': return 'from-blue-50 to-indigo-50 border-blue-400';
            default: return 'from-gray-50 to-gray-100 border-gray-400';
        }
    };

    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">משימות אחרונות</h2>
                <span className="text-2xl">✅</span>
            </div>
            <div className="space-y-4">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        onClick={() => onTaskClick?.(task)}
                        className={`p-4 bg-gradient-to-r ${getGradientClass(task.priority)} border-l-4 rounded-xl hover:shadow-md transition-shadow cursor-pointer ${task.isCompleted ? 'opacity-75' : ''}`}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    checked={task.isCompleted}
                                    onChange={(e) => {
                                        e.stopPropagation();
                                        onTaskToggle?.(task.id, e.target.checked);
                                    }}
                                    className="w-5 h-5 text-green-600 rounded border-gray-300 focus:ring-green-500"
                                />
                                <div>
                                    <h3 className={`font-semibold text-gray-800 ${task.isCompleted ? 'line-through' : ''}`}>
                                        {task.title}
                                    </h3>
                                    {task.dueDate && (
                                        <p className="text-sm text-gray-600">{formatDate(task.dueDate)}</p>
                                    )}
                                </div>
                            </div>
                            <Badge
                                variant={getPriorityColor(task.priority)}
                                size="sm"
                            >
                                {task.priority === 'high' ? 'גבוה' :
                                    task.priority === 'medium' ? 'בינוני' : 'נמוך'}
                            </Badge>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default RecentTasks; 