import React, { useState } from "react";
import Card, { CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { motion } from "framer-motion";

export const NoteForm: React.FC<{ onSubmit: (note: any) => void }> = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        status: "draft",
        type: "personal",
        sharedWith: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const note = {
            ...formData,
            sharedWith: formData.sharedWith
                ? formData.sharedWith.split(",").map(email => email.trim())
                : [],
        };

        onSubmit(note);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-lg mx-auto mt-10"
        >
            <Card className="shadow-lg rounded-2xl">
                <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">📝 Create a Note</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter note title"
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="content">Content</Label>
                            <Textarea
                                id="content"
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                placeholder="Write your note here..."
                                rows={4}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="status">Status</Label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-2"
                                required
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                                <option value="archived">Archived</option>
                            </select>
                        </div>

                        <div>
                            <Label htmlFor="type">Type</Label>
                            <select
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-2"
                                required
                            >
                                <option value="personal">Personal</option>
                                <option value="work">Work</option>
                                <option value="study">Study</option>
                            </select>
                        </div>

                        <div>
                            <Label htmlFor="sharedWith">Shared With (comma separated emails)</Label>
                            <Input
                                id="sharedWith"
                                name="sharedWith"
                                value={formData.sharedWith}
                                onChange={handleChange}
                                placeholder="example1@mail.com, example2@mail.com"
                            />
                        </div>

                        <Button type="submit" className="w-full">
                            Create Note
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </motion.div>
    );
};