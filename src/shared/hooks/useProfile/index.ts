import {
    deleteProfile,
    fetchProfileById,
    fetchProfiles,
    updateProfile
} from '@/src/shared/config/profileApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useProfiles = () => {
    return useQuery({
        queryKey: ['profiles'],
        queryFn: fetchProfiles,
    });
};

export const useProfileById = (id: string) => {
    return useQuery({
        queryKey: ['profile', id],
        queryFn: () => fetchProfileById(id),
        enabled: !!id,
    });
};

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

export const useDeleteProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profiles'] });
        },
    });
};
