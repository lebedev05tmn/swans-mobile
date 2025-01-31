import { create } from 'zustand';
import { page } from '@/src/components/createProfile/sliderContent';

type TCreateProfileState = {
    nextIndex: number;
    pages: number;
    currentIndex: number;
    currentPage: boolean;
    isFirstRender: boolean;
    isNextButtonDisabled: boolean;
    isPreviousButtonDisabled: boolean;
    isChooseInterestsActive: boolean;
};

type TCreateProfileActions = {
    actions: {
        next: () => void;
        prev: () => void;
        setFirstRender: () => void;
        unsetFirstRender: () => void;
        changeCurrentIndex: () => void;
        disableCountinueButton: () => void;
        disableBackButton: () => void;
        activateCountinueButton: () => void;
        activateBackButton: () => void;
        toggleContent: () => void;
        toggleCurrentPage: () => void;
    };
};

type TCreateProfileStore = TCreateProfileState & TCreateProfileActions;

const createProfileStore = create<TCreateProfileStore>((set) => ({
    nextIndex: 0,
    currentIndex: 0,
    pages: 6,
    currentPage: false, // false - slider, true - chooseInterests
    isFirstRender: true,
    isNextButtonDisabled: false,
    isPreviousButtonDisabled: false,
    isChooseInterestsActive: false,
    actions: {
        next: () =>
            set((state) => ({nextIndex: state.nextIndex + 1})),

        prev: () =>
            set((state) => ({ nextIndex: Math.max(state.nextIndex - 1, 0) })),
        setFirstRender: () => set({ isFirstRender: true }),
        unsetFirstRender: () => set({ isFirstRender: false }),
        changeCurrentIndex: () =>
            set((state) => ({ currentIndex: state.nextIndex })),
        disableCountinueButton: () => set({ isNextButtonDisabled: true }),
        disableBackButton: () => set({ isPreviousButtonDisabled: true }),
        activateCountinueButton: () => set({ isNextButtonDisabled: false }),
        activateBackButton: () => set({ isPreviousButtonDisabled: false }),
        toggleContent: () =>
            set((state) => ({
                isChooseInterestsActive: !state.isChooseInterestsActive,
            })),
        toggleCurrentPage: () =>
            set((state) => ({ currentPage: !state.currentPage })),
    },
}));

export default createProfileStore;
