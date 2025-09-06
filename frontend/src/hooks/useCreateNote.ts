import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notesApi } from "@/api/note";
import { Note } from "@/types";

export const useCreateNote = () => {
    const queryClient = useQueryClient();

    return useMutation<
        Note,
        unknown,
        Note,
        { previousNotes?: Note[] }
    >({
        mutationFn: (note: Note) => notesApi.createNote(note),

        onMutate: async (note: Note) => {
            await queryClient.cancelQueries({ queryKey: ["notes"] });

            const previousNotes = queryClient.getQueryData<Note[]>(["notes"]);

            queryClient.setQueryData<Note[]>(["notes"], (old) =>
                Array.isArray(old) ? [...old, note] : [note]
            );

            return { previousNotes };
        },

        onError: (err, note, context) => {
            if (context?.previousNotes) {
                queryClient.setQueryData(["notes"], context.previousNotes);
            }
            alert("Failed to create note");
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
        },
    });
};