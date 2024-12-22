import { create } from 'zustand';
import contentPages from './ContentPages';

interface ContentSwitcherState {
    currentIndex: number;
    activeIndex: number;
    halfSwitchTime: number;
    isFirstRender: boolean;
    isCountinueButtonDisabled: boolean;
    isBackButtonDisabled: boolean;
    next: () => void;
    prev: () => void;
    firstRender: () => void;
    changeActiveIndex: () => void;
    disableCountinueButton: () => void;
    disableBackButton: () => void;
    activateCountinueButton: () => void;
    activateBackButton: () => void;
}

const useContentSwitcher = create<ContentSwitcherState>((set, get) => ({
    currentIndex: 0,
    activeIndex: 0,
    halfSwitchTime: 300,
    isCountinueButtonDisabled: false,
    isBackButtonDisabled: false,
    isFirstRender: true,
    next: () => {
        set((state) => {
            const nextIndex = Math.min(
                state.currentIndex + 1,
                contentPages.length - 1,
            );

            return { currentIndex: nextIndex };
        });
    },
    prev: () => {
        set((state) => {
            const prevIndex = Math.max(state.currentIndex - 1, 0);

            return { currentIndex: prevIndex };
        });
    },
    firstRender: () => set({ isFirstRender: false }),
    changeActiveIndex: () => set({ activeIndex: get().currentIndex }),
    disableCountinueButton: () => set({ isCountinueButtonDisabled: true }),
    disableBackButton: () => set({ isBackButtonDisabled: true }),
    activateCountinueButton: () => set({ isCountinueButtonDisabled: false }),
    activateBackButton: () => set({ isBackButtonDisabled: false }),
}));

export default useContentSwitcher;
