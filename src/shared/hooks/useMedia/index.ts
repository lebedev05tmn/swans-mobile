import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    fetchMediaById,
    uploadMedia,
    deleteMedia,
} from '@/src/shared/config/mediaApi';

export const useMediaById = (id: string) => {
    return useQuery({
        queryKey: ['media', id],
        queryFn: () => fetchMediaById(id),
        enabled: !!id,
    });
};

export const useUploadMedia = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: uploadMedia,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['media'] });
        },
    });
};

export const useDeleteMedia = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteMedia,
        onSuccess: (_, id) => {
            queryClient.invalidateQueries({ queryKey: ['media', id] });
        },
    });
};
