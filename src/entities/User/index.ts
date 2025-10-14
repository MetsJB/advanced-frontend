export { userReducer, userActions } from './model/slice/userSlice';
export type { UserSchema, User } from './model/types/user';
export { UserRole } from './model/consts/userConsts';

export { getUserAuthData } from './model/selectors/getUserAuthData';
export {
    isUserAdmin,
    isUserManager,
    getUserRoles,
} from './model/selectors/roleSelectors';
export { getUserInited } from './model/selectors/getUserInited';
