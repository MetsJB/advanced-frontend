import { StateScheme } from '@/app/providers/StoreProvider';
import { getProfileData } from './getProfileData';
import { Currency } from '@/entities/Currency';
import { Country } from '@/entities/Country';

describe('getProfileData.test', () => {
  test('should return true', () => {
    const data = {
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
        data,
      },
    };

    expect(getProfileData(state as StateScheme)).toEqual(
      data,
    );
  });
  test('should work with empty state', () => {
    const state: DeepPartial<StateScheme> = {};

    expect(getProfileData(state as StateScheme)).toEqual(
      undefined,
    );
  });
});
