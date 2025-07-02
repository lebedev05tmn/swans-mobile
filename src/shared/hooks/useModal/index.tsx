import { useModalStore } from '@/src/shared/stores/useModalStore';
import type { ModalData } from '@/src/shared/stores/useModalStore';

export const showModal = (data: ModalData) => {
  useModalStore.getState().showModal(data);
};

export const closeModal = () => {
  useModalStore.getState().closeModal();
};
