import { create } from 'zustand';

interface ModalData {
    title?: string; 
    closeOnOverlayClick?: boolean; 
}

interface ModalState {
    isVisible: boolean;
    modalData: ModalData | null;
    showModal: (data: ModalData) => void;
    closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
    isVisible: false,
    modalData: null,
    showModal: (data: ModalData) => set({ isVisible: true, modalData: data }),
    closeModal: () => set({ isVisible: false, modalData: null }),
}));