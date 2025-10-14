import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import { ReducersMapObject } from '@reduxjs/toolkit';
import i18nforTest from '../../../config/i18n/i18nForTests';
import { StateScheme, StoreProvider } from '@/app/providers/StoreProvider';

interface ComponentRenderOptions {
  route?: string;
  initialState?: DeepPartial<StateScheme>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateScheme>>;
}

export function componentRender(
    component: ReactNode,
    options: ComponentRenderOptions = {},
) {
    const { route = '/', initialState, asyncReducers } = options;

    return render(
        <MemoryRouter initialEntries={[route]}>
            <StoreProvider asyncReducers={asyncReducers} initialSate={initialState}>
                <I18nextProvider i18n={i18nforTest}>{component}</I18nextProvider>
            </StoreProvider>
        </MemoryRouter>,
    );
}
