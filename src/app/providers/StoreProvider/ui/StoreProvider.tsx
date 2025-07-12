import { classNames } from "shared/lib/classNames/classNames";
import cls from "./StoreProvider.module.scss";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { createReduxStore } from "../config/store";
import { StateScheme } from "../config/stateSchema";
import { DeepPartial } from "@reduxjs/toolkit";

interface StoreProviderProps {
  children?: ReactNode;
  initialSate?: DeepPartial<StateScheme  >
}

export const StoreProvider = (props: StoreProviderProps) => {
  const { children, initialSate } = props;

  const store = createReduxStore(initialSate as StateScheme);

  return <Provider store={store}>{children}</Provider>;
};
