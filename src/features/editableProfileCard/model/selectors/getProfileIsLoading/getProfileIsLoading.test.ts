import { StateScheme } from '@/app/providers/StoreProvider';
import { getProfileIsLoading } from './getProfileIsLoading';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';

describe('getProfileIsLoading.test', () => {
    test('should return true', () => {
        const state: DeepPartial<StateScheme> = {
            profile: {
                isLoading: true,
            },
        };

        expect(getProfileIsLoading(state as StateScheme)).toBe(true);
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateScheme> = {};

        expect(getProfileIsLoading(state as StateScheme)).toBe(false);
    });
});
