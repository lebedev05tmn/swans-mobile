import { create } from 'zustand';

type TImagesStoreState = {
    currentImageIndex: number;
};

type IImagesStoreActions = {
    actions: {
        setCurrentImageIndex: (index: number) => void;
    };
};

type TImagesStore = TImagesStoreState & IImagesStoreActions;

const useImagesStore = create<TImagesStore>((set) => ({
    currentImageIndex: 0,
    actions: {
        setCurrentImageIndex: (index: number) => set({ currentImageIndex: Math.max(index, 0) }),
    },
}));

export default useImagesStore;
