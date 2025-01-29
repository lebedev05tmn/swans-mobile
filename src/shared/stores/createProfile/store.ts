import { create } from 'zustand';

type TCreateProfileState = {
    nextIndex: number;
    currentIndex: number;
    pages: number;
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
        changeActiveIndex: () => void;
        disableCountinueButton: () => void;
        disableBackButton: () => void;
        activateCountinueButton: () => void;
        activateBackButton: () => void;
        toggleContent: () => void;
    };
};

type TCreateProfileStore = TCreateProfileState & TCreateProfileActions;

const createProfileStore = create<TCreateProfileStore>((set) => ({
    nextIndex: 0,
    pages: 5,
    currentIndex: 0,
    isFirstRender: true,
    isNextButtonDisabled: false,
    isPreviousButtonDisabled: false,
    isChooseInterestsActive: false,
    actions: {
        next: () => {
            set((state) => {
                const nextIndex = Math.min(
                    state.nextIndex + 1,
                    state.pages - 1,
                );

                return { nextIndex: nextIndex };
            });
        },
        prev: () => {
            set((state) => {
                const nextIndex = Math.max(state.nextIndex - 1, 0);

                return { nextIndex: nextIndex };
            });
        },
        setFirstRender: () => set(state => ({ isFirstRender: true })),
        unsetFirstRender: () => set(state => ({ isFirstRender: false })),
        changeActiveIndex: () =>
            set((state) => ({ currentIndex: state.nextIndex })),
        disableCountinueButton: () => set({ isNextButtonDisabled: true }),
        disableBackButton: () => set({ isPreviousButtonDisabled: true }),
        activateCountinueButton: () => set({ isNextButtonDisabled: false }),
        activateBackButton: () => set({ isPreviousButtonDisabled: false }),
        toggleContent: () => set((state) => ({ isChooseInterestsActive: !state.isChooseInterestsActive })),
    },
}));

export default createProfileStore;
