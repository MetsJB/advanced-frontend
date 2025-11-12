import { StateScheme } from '@/app/providers/StoreProvider';

export const getArticleRecommendationsIsLoading = (
  state: StateScheme,
) =>
  state.articleDetailsPage?.recommmendations?.isLoading ||
  false;

export const getArticleRecommendationsError = (
  state: StateScheme,
) => state.articleDetailsPage?.recommmendations?.error;
