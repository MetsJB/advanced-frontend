import { useCallback, useRef } from 'react';

export function useThrottle(callback: (...args: any[]) => void, delay: number) {
    const throttRef = useRef(false);

    return useCallback(
        (...args: any[]) => {
            if (!throttRef.current) {
                callback(...args);

                throttRef.current = true;

                setTimeout(() => {
                    throttRef.current = false;
                }, delay);
            }
        },
        [callback, delay],
    );
}
