import { useCallback, useRef } from 'react';

function useThrottle<T extends (...args: Parameters<T>) => ReturnType<T>>(
    callback: T,
    delay: number,
): (...args: Parameters<T>) => void {
    const lastCallRef = useRef(0);

    return useCallback(
        (...args: Parameters<T>) => {
            const now = Date.now();
            const timeSinceLastCall = now - lastCallRef.current;

            if (timeSinceLastCall >= delay) {
                lastCallRef.current = now;
                callback(...args);
            }
        },
        [callback, delay],
    );
}

export default useThrottle;
