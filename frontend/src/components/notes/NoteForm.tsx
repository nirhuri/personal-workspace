import React, { useState } from "react";
import Card, { CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { motion } from "framer-motion";
import { NoteType } from "@/types";
import { InlineChipsInput } from "@/components/ui/InlineChipInput";
import { validateEmail } from "@/services/email.service";

export const NoteForm: React.FC<{ onSubmit: (note: any) => void }> = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        type: NoteType.PERSONAL,
        sharedWith: [] as string[],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
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
                            <Label htmlFor="type">Type</Label>
                            <select
                                id="type"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full border rounded-lg p-2"
                                required
                            >
                                <option value={NoteType.PERSONAL}>Personal</option>
                                <option value={NoteType.SHARED}>Shared</option>
                            </select>
                        </div>

                        {formData.type === NoteType.SHARED && (
                            <div>
                                <Label htmlFor="sharedWith">Shared With</Label>
                                <InlineChipsInput
                                    value={formData.sharedWith}
                                    onChange={(newEmails: string[]) =>
                                        setFormData(prev => ({ ...prev, sharedWith: newEmails.filter(validateEmail) }))
                                    }
                                    placeholder="Type emails and press Enter"
                                />
                            </div>
                        )}

                        <Button type="submit" className="w-full">
                            Create Note
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </motion.div>
    );
};