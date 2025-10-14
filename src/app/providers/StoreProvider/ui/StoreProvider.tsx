import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './StoreProvider.module.scss';
import { createReduxStore } from '../config/store';
import { StateScheme } from '../config/stateSchema';

interface StoreProviderProps {
  children?: ReactNode;
  initialSate?: DeepPartial<StateScheme>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateScheme>>;
}

export const StoreProvider = (props: StoreProviderProps) => {
    const { children, initialSate, asyncReducers } = props;
    // const navigate = useNavigate();

    const store = createReduxStore(
    initialSate as StateScheme,
    asyncReducers as ReducersMapObject<StateScheme>,
    // navigate
    );

    console.log('render');

    return <Provider store={store}>{children}</Provider>;
};
