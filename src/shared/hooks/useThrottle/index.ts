import { useCallback, useRef } from 'react';

const useThrottle = <T extends (...args: any[]) => any>(
    callback: T,
    delay: number,
): ((...args: Parameters<T>) => void) => {
    const lastCallRef = useRef(0);
    const argsRef = useRef<Parameters<T>>();

    return useCallback(
        (...args: Parameters<T>) => {
            argsRef.current = args;
            const now = Date.now();
            const timeSinceLastCall = now - lastCallRef.current;

            if (timeSinceLastCall >= delay) {
                lastCallRef.current = now;
                callback(...argsRef.current);
            }
        },
        [callback, delay],
    );
};

export default useThrottle;