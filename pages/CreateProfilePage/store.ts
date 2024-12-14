import { create } from 'zustand';

type StoreState = {
  currentIndex: number;
  totalPages: number;
  nextPage: () => void;
  previousPage: () => void;
};

const useStore = create<StoreState>((set, get) => ({
    currentIndex: 0,
    totalPages: 5, 
    nextPage: () => {
        const { currentIndex, totalPages } = get();
        if (currentIndex < totalPages) {
            set((state) => ({
                currentIndex: (state.currentIndex + 1),
            }))
        }
    },
    previousPage: () => {
        const { currentIndex } = get();
        if (currentIndex > 0) {
            set((state) => ({
                currentIndex: (state.currentIndex - 1),
            }))
        }
    },
}));

export default useStore;
