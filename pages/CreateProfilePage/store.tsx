import { create } from 'zustand';
import contentPages from './ContentPages';

interface ContentSwitcherState {
    currentIndex: number;
    next: () => void;
    prev: () => void;
}

const useContentSwitcher = create<ContentSwitcherState>((set, get) => ({
    currentIndex: 0,
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
}));

export default useContentSwitcher;
