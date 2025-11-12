import { StateScheme } from '@/app/providers/StoreProvider';

export const getUserAuthData = (state: StateScheme) => {
  return state.user.authData;
};
