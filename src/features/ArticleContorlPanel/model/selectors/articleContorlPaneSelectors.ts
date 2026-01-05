import { StateScheme } from '@/app/providers/StoreProvider';

export const getArticleContorlPanelReadonly = (state: StateScheme) =>
  state.articleContorlPanel?.readonly ?? true;

export const getArticleContorlPanelIsLoading = (state: StateScheme) =>
  state.articleContorlPanel?.isLoading

export const getArticleContorlPanelForm = (state: StateScheme) =>
  state.articleContorlPanel?.form ;
