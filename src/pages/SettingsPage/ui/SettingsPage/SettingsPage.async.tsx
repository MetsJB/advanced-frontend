import { lazy } from 'react';

export const SettingsPagesAsync = lazy(
  () => import('./SettingsPage'),
);
