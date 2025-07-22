import { DeepPartial } from "@reduxjs/toolkit";
import { Story } from "@storybook/react";
import { StateScheme, StoreProvider } from "app/providers/StoreProvider";
import { Theme, ThemeProvider } from "app/providers/ThemeProvider";

export const StoreDecorator = (state: DeepPartial<StateScheme>) => (StoryComponent: Story) =>
  (
    <StoreProvider initialSate={state}>
      <StoryComponent />
    </StoreProvider>
  );
