import { create } from 'zustand';
import contentPages from './ContentPages';

interface ContentSwitcherState {
    currentIndex: number;
    activeIndex: number;
    halfSwitchTime: number;
    isFirstRender: boolean;
    next: () => void;
    prev: () => void;
    firstRender: () => void;
    changeActiveIndex: () => void;
}

const useContentSwitcher = create<ContentSwitcherState>((set, get) => ({
    currentIndex: 0,
    activeIndex: 0,
    halfSwitchTime: 300,
    isFirstRender: true,
    next: () => {
        const { currentIndex } = get();
        const nextIndex = Math.min(currentIndex + 1, contentPages.length - 1);

        set({
            currentIndex: nextIndex,
        });
    },
    prev: () => {
        const { currentIndex } = get();
        const prevIndex = Math.max(currentIndex - 1, 0);

        set({
            currentIndex: prevIndex,
        });
    },
    firstRender: () => set({ isFirstRender: false }),
    changeActiveIndex: () => set({ activeIndex: get().currentIndex }),
}));

export default useContentSwitcher;
