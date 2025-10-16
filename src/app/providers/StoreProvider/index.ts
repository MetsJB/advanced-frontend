import { StoreProvider } from './ui/StoreProvider';
import { createReduxStore, AppDispatch } from './config/store';
import type {
  StateScheme,
  ReduxStoreWithManager,
  ThunkConfig,
  StateSchemaKey,
} from './config/stateSchema';

export { StoreProvider, createReduxStore, StateScheme, ThunkConfig };

export type { AppDispatch, ReduxStoreWithManager, StateSchemaKey };
