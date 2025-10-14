import { StateScheme } from '@/app/providers/StoreProvider';
import { getProfileReadonly } from './getProfileReadonly';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';

describe('getProfileReadonly.test', () => {
    test('should return true', () => {
        const state: DeepPartial<StateScheme> = {
            profile: {
                readonly: true,
            },
        };

        expect(getProfileReadonly(state as StateScheme)).toBe(true);
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateScheme> = {};

        expect(getProfileReadonly(state as StateScheme)).toBe(undefined);
    });
});
