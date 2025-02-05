import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    fetchMediaById,
    uploadMedia,
    deleteMedia,
} from '@/src/shared/config/mediaApi';

// Получение медиафайла по ID
export const useMedia = (id: string) => {
    return useQuery({
        queryKey: ['media', id],
        queryFn: () => fetchMediaById(id),
        enabled: !!id,
    });
};

// Загрузка медиафайла
export const useUploadMedia = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: uploadMedia,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['media'] });
        },
    });
};

// Удаление медиафайла
export const useDeleteMedia = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteMedia,
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ['media', id] });
        },
    });
};
