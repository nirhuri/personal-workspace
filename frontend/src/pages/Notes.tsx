import React from 'react';
import PageHeader from '../components/layout/PageHeader';
import NoteCard from '../components/notes/NoteCard';
import { Note } from '../types';

const Notes: React.FC = () => {
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
        },
        {
            id: '3',
            title: 'רשימת קניות',
            content: 'חלב, לחם, ירקות, בשר, תבלינים. לא לשכוח לקנות גם פירות וירקות טריים.',
            createdAt: new Date(Date.now() - 259200000),
            updatedAt: new Date(Date.now() - 259200000),
            isShared: false,
            createdBy: 'user1'
        }
    ];

    const handleAddNote = () => {
        console.log('Add note clicked');
        // בהמשך זה יפתח מודל להוספת פתק
    };

    const handleEditNote = (note: Note) => {
        console.log('Edit note:', note);
        // בהמשך זה יפתח מודל לעריכת פתק
    };

    const handleDeleteNote = (noteId: string) => {
        console.log('Delete note:', noteId);
        // בהמשך זה ימחק את הפתק
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <PageHeader
                    title="פתקים"
                    subtitle="נהל את הפתקים שלך"
                    actionLabel="פתק חדש"
                    actionVariant="primary"
                    onAction={handleAddNote}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockNotes.map((note) => (
                        <NoteCard
                            key={note.id}
                            note={note}
                            onEdit={handleEditNote}
                            onDelete={handleDeleteNote}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Notes; 