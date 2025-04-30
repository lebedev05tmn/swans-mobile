import { fetchMediaById } from '@/src/shared/config/mediaApi';
import { useQuery } from '@tanstack/react-query';

export const useMediaById = (id: string) => {
    return useQuery({
        queryKey: ['media', id],
        queryFn: () => fetchMediaById(id),
        enabled: !!id,
    });
};
