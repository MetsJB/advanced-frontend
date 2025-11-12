import { createSelector } from '@reduxjs/toolkit';
import { StateScheme } from '@/app/providers/StoreProvider';

export const getUIScroll = (state: StateScheme) =>
  state.ui.scroll;

export const getUIScrollByPath = createSelector(
  getUIScroll,
  (state: StateScheme, path: string) => path,
  (sroll, path) => sroll[path] || 0,
);
