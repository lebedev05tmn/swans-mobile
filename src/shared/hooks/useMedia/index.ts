import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchMediaById } from '@/src/shared/config/mediaApi';

export const useMediaById = (id: string) => {
    return useQuery({
        queryKey: ['media', id],
        queryFn: () => fetchMediaById(id),
        enabled: !!id,
    });
};
