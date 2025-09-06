// pages/Notes.tsx
import React, { useState } from 'react';
import PageHeader from '../components/layout/PageHeader';
import NoteCard from '../components/notes/NoteCard';
import { Note, NoteType } from '../types';
import { NoteForm } from '../components/notes/NoteForm';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from "@tanstack/react-query";
import { useCreateNote } from "@/hooks/useCreateNote";

// ⚠️ זמני: נחליף ב־API אמיתי
const fetchNotes = async (): Promise<Note[]> => {
    return [
        {
            id: '1',
            title: 'פגישה עם הלקוח',
            content:
                'דיון על דרישות הפרויקט החדש. צריך להכין מצגת עם האפשרויות השונות ולבדוק את התקציב.',
            createdAt: new Date(),
            updatedAt: new Date(),
            type: NoteType.PERSONAL,
            isShared: false,
            createdBy: 'user1',
        },
        {
            id: '2',
            title: "רעיונות לפיצ'רים",
            content:
                'רשימת רעיונות לפיתוח האפליקציה: אינטגרציה עם Slack, התראות מתקדמות, תמיכה ב-dark mode.',
            createdAt: new Date(Date.now() - 86400000),
            updatedAt: new Date(Date.now() - 86400000),
            type: NoteType.SHARED,
            sharedWith: ["user1", "user122", "user34"],
            isShared: true,
            createdBy: 'user1',
        },
    ];
};

const Notes: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // notes query
    const { data: notes = [], isLoading } = useQuery({
        queryKey: ["notes"],
        queryFn: fetchNotes,
    });

    // create note mutation
    const createNote = useCreateNote();

    const handleAddNote = () => {
        setIsModalOpen(true);
    };

    const handleCreateNote = (note: Note) => {
        createNote.mutate(note, {
            onSuccess: () => {
                setIsModalOpen(false);
            },
        });
    };

    const handleEditNote = (note: Note) => {
        console.log('Edit note:', note);
        // כאן תוכל לפתוח את המודל עם הערך הקיים לעריכה
    };

    const handleDeleteNote = (noteId: string) => {
        console.log("Delete note", noteId);
        // בהמשך נממש useDeleteNote
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

                {isLoading ? (
                    <p>טוען פתקים...</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {notes.map((note) => (
                            <NoteCard
                                key={note.id}
                                note={note}
                                onEdit={handleEditNote}
                                onDelete={handleDeleteNote}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.8 }}
                            className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl relative"
                        >
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-bold"
                            >
                                ✕
                            </button>
                            <NoteForm onSubmit={handleCreateNote} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Notes;