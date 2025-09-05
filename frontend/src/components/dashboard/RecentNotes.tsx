import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Note } from '../../types';

interface RecentNotesProps {
    notes: Note[];
    onNoteClick?: (note: Note) => void;
}

const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
};

const RecentNotes: React.FC<RecentNotesProps> = ({ notes, onNoteClick }) => {
    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Recent Notes</h2>
                <span className="text-2xl">📝</span>
            </div>
            <div className="space-y-4">
                {notes.map((note) => (
                    <div
                        key={note.id}
                        onClick={() => onNoteClick?.(note)}
                        className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 rounded-xl hover:shadow-md transition-shadow cursor-pointer"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-800 mb-1">{note.title}</h3>
                                <p className="text-sm text-gray-600">
                                    {note.content.length > 50
                                        ? `${note.content.substring(0, 50)}...`
                                        : note.content}
                                </p>
                                <span className="inline-block mt-2 text-xs text-gray-500">
                                    {formatDate(note.updatedAt!)}
                                </span>
                            </div>
                            <Badge
                                variant={note.isShared ? 'success' : 'warning'}
                                size="sm"
                            >
                                {note.isShared ? 'Shared' : 'Private'}
                            </Badge>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default RecentNotes; 