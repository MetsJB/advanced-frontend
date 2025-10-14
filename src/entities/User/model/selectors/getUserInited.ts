import { StateScheme } from '@/app/providers/StoreProvider';

export function getUserInited(state: StateScheme) {
    return state.user._inited;
}
