import { StateScheme } from '@/app/providers/StoreProvider';
import { getLoginUsername } from './getLoginUsername';

describe('getLoginUsername.test', () => {
    test('should return value', () => {
        const state: DeepPartial<StateScheme> = {
            loginForm: {
                username: 'Zahar',
            },
        };

        expect(getLoginUsername(state as StateScheme)).toEqual('Zahar');
    });
    test('should work with empty state', () => {
        const state: DeepPartial<StateScheme> = {};

        expect(getLoginUsername(state as StateScheme)).toEqual('');
    });
});
