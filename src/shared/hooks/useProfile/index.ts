import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    fetchProfiles,
    fetchProfileById,
    createProfile,
    updateProfile,
    deleteProfile,
} from '@/src/shared/config/profileApi';

// Получение всех профилей
export const useProfiles = () => {
    return useQuery({
        queryKey: ['profiles'],
        queryFn: fetchProfiles,
    });
};

// Получение профиля по ID
export const useProfile = (id: string) => {
    return useQuery({
        queryKey: ['profile', id],
        queryFn: () => fetchProfileById(id),
        enabled: !!id,
    });
};

// Создание профиля
export const useCreateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profiles'] });
        },
    });
};

// Обновление профиля
export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) =>
            updateProfile(id, data),
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ['profile', id] });
        },
    });
};

// Удаление профиля
export const useDeleteProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profiles'] });
        },
    });
};
