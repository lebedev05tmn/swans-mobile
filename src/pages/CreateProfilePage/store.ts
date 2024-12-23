import { create } from 'zustand';
import contentPages from './createProfileBodyComponents';

type TCreateProfileState = {
    nextIndex: number;
    currentIndex: number;
    isFirstRender: boolean;
    isNextButtonDisabled: boolean;
    isPreviousButtonDisabled: boolean;
};

type TCreateProfileActions = {
    action: {
        next: () => void;
        prev: () => void;
        firstRender: () => void;
        changeActiveIndex: () => void;
        disableCountinueButton: () => void;
        disableBackButton: () => void;
        activateCountinueButton: () => void;
        activateBackButton: () => void;
    };
};

type TCreateProfileStore = TCreateProfileState & TCreateProfileActions;

const createProfileStore = create<TCreateProfileStore>((set) => ({
    nextIndex: 0,
    currentIndex: 0,
    isFirstRender: true,
    isNextButtonDisabled: false,
    isPreviousButtonDisabled: false,

    action: {
        next: () => {
            set((state) => {
                const nextIndex = Math.min(
                    state.nextIndex + 1,
                    contentPages.length - 1,
                );

                return { nextIndex: nextIndex };
            });
        },
        prev: () => {
            set((state) => {
                const prevIndex = Math.max(state.nextIndex - 1, 0);

                return { nextIndex: prevIndex };
            });
        },
        firstRender: () => set({ isFirstRender: false }),
        changeActiveIndex: () =>
            set((state) => ({ currentIndex: state.nextIndex })),
        disableCountinueButton: () => set({ isNextButtonDisabled: true }),
        disableBackButton: () => set({ isPreviousButtonDisabled: true }),
        activateCountinueButton: () => set({ isNextButtonDisabled: false }),
        activateBackButton: () => set({ isPreviousButtonDisabled: false }),
    },
}));

export default createProfileStore;
