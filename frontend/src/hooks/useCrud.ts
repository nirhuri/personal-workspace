import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export const useCrud = <T>(
    key: string,
    api: {
        list: () => Promise<T[]>;
        create?: (data: Partial<T>) => Promise<T>;
        update?: (id: string, data: Partial<T>) => Promise<T>;
        remove?: (id: string) => Promise<void>;
    }
) => {
    const queryClient = useQueryClient();

    // GET list
    const list = useQuery({
        queryKey: [key],
        queryFn: api.list,
    });

    // CREATE
    const create = useMutation({
        mutationFn: api.create!,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [key] }),
    });

    // UPDATE
    const update = useMutation({
        mutationFn: ({ id, data }: { id: string; data: Partial<T> }) =>
            api.update!(id, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [key] }),
    });

    // DELETE
    const remove = useMutation({
        mutationFn: (id: string) => api.remove!(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [key] }),
    });

    return { list, create, update, remove };
};