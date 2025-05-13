import { useModalStore } from '@/src/shared/stores/useModalStore';

export const showModal = (data: { title?: string; closeOnOverlayClick?: boolean }) => {
    useModalStore.getState().showModal(data);
};

export const closeModal = () => {
    useModalStore.getState().closeModal();
};