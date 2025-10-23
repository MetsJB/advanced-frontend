import { StateScheme } from '@/app/providers/StoreProvider';

export const getaddCommentFormText = (state: StateScheme) => state.addCommentForm?.text ?? '';
export const getaddCommentFormError = (state: StateScheme) => state.addCommentForm?.error;
