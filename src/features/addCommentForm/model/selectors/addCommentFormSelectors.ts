import { StateScheme } from '@/app/providers/StoreProvider/config/stateSchema';

export const getaddCommentFormText = (state: StateScheme) => state.addCommentForm?.text ?? '';
export const getaddCommentFormError = (state: StateScheme) => state.addCommentForm?.error;
