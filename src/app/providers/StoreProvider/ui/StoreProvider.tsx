import { classNames } from "shared/lib/classNames/classNames";
import cls from "./StoreProvider.module.scss";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { createReduxStore } from "../config/store";
import { StateScheme } from "../config/stateSchema";
import { ReducersMapObject } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

interface StoreProviderProps {
  children?: ReactNode;
  initialSate?: DeepPartial<StateScheme>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateScheme>>;
}

export const StoreProvider = (props: StoreProviderProps) => {
  const { children, initialSate, asyncReducers } = props;
  const navigate = useNavigate();

   const store = createReduxStore(
    initialSate as StateScheme,
    asyncReducers as ReducersMapObject<StateScheme>,
    navigate
  );

  return <Provider store={store}>{children}</Provider>;
};
