import React from 'react';
import Badge from '../ui/Badge';
import { Task } from '../../types';

interface TaskItemProps {
    task: Task;
    onToggle?: (taskId: string, completed: boolean) => void;
    onEdit?: (task: Task) => void;
    onDelete?: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onEdit, onDelete }) => {
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
            case 'high': return 'from-red-50 to-pink-50 border-red-200';
            case 'medium': return 'from-orange-50 to-amber-50 border-orange-200';
            case 'low': return 'from-blue-50 to-indigo-50 border-blue-200';
            default: return 'from-gray-50 to-gray-100 border-gray-200';
        }
    };

    return (
        <div className={`p-4 bg-gradient-to-r ${getGradientClass(task.priority)} border rounded-xl hover:shadow-md transition-shadow ${task.isCompleted ? 'opacity-75' : ''}`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        checked={task.isCompleted}
                        onChange={(e) => onToggle?.(task.id, e.target.checked)}
                        className="w-5 h-5 text-green-600 rounded border-gray-300 focus:ring-green-500"
                    />
                    <div className="flex-1">
                        <h3 className={`font-semibold text-gray-800 ${task.isCompleted ? 'line-through' : ''}`}>
                            {task.title}
                        </h3>
                        {task.description && (
                            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                        )}
                        {task.dueDate && (
                            <p className="text-sm text-gray-600">{formatDate(task.dueDate)}</p>
                        )}
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <Badge
                        variant={getPriorityColor(task.priority)}
                        size="sm"
                    >
                        {task.priority === 'high' ? 'גבוה' :
                            task.priority === 'medium' ? 'בינוני' : 'נמוך'}
                    </Badge>
                    {task.isCompleted && (
                        <Badge variant="success" size="sm">
                            הושלם
                        </Badge>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskItem; 