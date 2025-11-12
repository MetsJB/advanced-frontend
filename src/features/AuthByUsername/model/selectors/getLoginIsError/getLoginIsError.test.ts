import { StateScheme } from '@/app/providers/StoreProvider';
import { getLoginIsError } from './getLoginIsError';

describe('getLoginError.test', () => {
  test('should return error', () => {
    const state: DeepPartial<StateScheme> = {
      loginForm: {
        error: 'error',
      },
    };

    expect(getLoginIsError(state as StateScheme)).toEqual(
      'error',
    );
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateScheme> = {};

    expect(getLoginIsError(state as StateScheme)).toEqual(
      undefined,
    );
  });
});
