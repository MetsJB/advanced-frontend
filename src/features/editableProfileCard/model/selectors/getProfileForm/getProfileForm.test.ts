import { StateScheme } from '@/app/providers/StoreProvider';
import { getProfileForm } from './getProfileForm';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';

describe('getProfileForm.test', () => {
    test('should return true', () => {
        const form = {
            age: 22,
            avatar: 'avatar',
            city: 'Moscow',
            currency: Currency.RUB,
            first: 'Zahar',
            lastname: 'Ivanov',
            username: 'Kerry_13',
            country: Country.Russia,
        };

        const state: DeepPartial<StateScheme> = {
            profile: {
                form,
            },
        };

        expect(getProfileForm(state as StateScheme)).toEqual(form);
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateScheme> = {};

        expect(getProfileForm(state as StateScheme)).toBe(undefined);
    });
});
