import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import i18nforTest from "../../../config/i18n/i18nForTests";
import { MemoryRouter } from "react-router-dom";
import { StateScheme, StoreProvider } from "app/providers/StoreProvider";
import { DeepPartial } from "@reduxjs/toolkit";

interface ComponentRenderOptions {
  route?: string;
  initialState?:DeepPartial<StateScheme>
}

export function componentRender(
  component: ReactNode,
  options: ComponentRenderOptions = {}
) {
  const { route = "/", initialState } = options;

  return render(
    <StoreProvider initialSate={initialState}>
      <MemoryRouter initialEntries={[route]}>
        <I18nextProvider i18n={i18nforTest}>{component}</I18nextProvider>
      </MemoryRouter>
    </StoreProvider>
  );
}
