import { create } from 'zustand';
import type { FC, ReactElement } from 'react';
import { LucideProps } from 'lucide-react-native';
import { StyleProp, ViewStyle, TextStyle } from 'react-native';

export interface ModalButton {
  title: string;
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}


export interface ModalData {
  icon?: ReactElement<LucideProps>;
  title?: string;
  subTitle?: string;
  closeOnOverlayClick?: boolean;
  buttons?: ModalButton[];
}

export interface ModalState {
  isVisible: boolean;
  modalData: ModalData | null;
  showModal: (data: ModalData) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isVisible: false,
  modalData: null,
  showModal: (data) => set({ isVisible: true, modalData: data }),
  closeModal: () => set({ isVisible: false, modalData: null }),
}));
