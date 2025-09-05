import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Icon from '../ui/Icon';
import { Note } from '../../types';

interface NoteCardProps {
    note: Note;
    onEdit?: (note: Note) => void;
    onDelete?: (noteId: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete }) => {
    const formatDate = (date: Date) => {
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'היום';
        if (diffDays === 1) return 'אתמול';
        if (diffDays < 7) return `לפני ${diffDays} ימים`;
        return date.toLocaleDateString('he-IL');
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('he-IL', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <Card className="p-6 hoverable">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{note.title}</h3>
                <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">{formatDate(note.updatedAt!)}</span>
                    <Badge
                        variant={note.isShared ? 'success' : 'primary'}
                        size="sm"
                    >
                        {note.isShared ? 'משותף' : 'אישי'}
                    </Badge>
                </div>
            </div>

            <p className="text-gray-600 mb-4 leading-relaxed">
                {note.content}
            </p>

            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <div className="flex space-x-2">
                    <button
                        onClick={() => onEdit?.(note)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                        <Icon name="edit" size="sm" />
                    </button>
                    <button
                        onClick={() => onDelete?.(note.id!)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <Icon name="delete" size="sm" />
                    </button>
                </div>
                <div className="flex items-center text-xs text-gray-500">
                    <Icon name="time" size="sm" className="mr-1" />
                    {formatTime(note.updatedAt!)}
                </div>
            </div>
        </Card>
    );
};

export default NoteCard; 