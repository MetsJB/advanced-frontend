import { addDecorator } from "@storybook/react";
import { StyleDecorator } from "../../src/shared/config/storybook/styleDecorator/StyleDecorator";
import { ThemeDecorator } from "../../src/shared/config/storybook/themeDecorator/ThemeDecorator";
import { RouterDecorator } from "../../src/shared/config/storybook/routerDecorator/RouterDecorator";
import { SuspenseDecorator } from "../../src/shared/config/storybook/SuspenceDecorator/SuspenceDecorator";
import { Theme } from "../../src/shared/const/theme";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: "fullscreen",
  themes: {
    default: "light",
    list: [
      { name: "light", class: Theme.LIGHT, color: "#cbd2d5ff" },
      { name: "dark", class: Theme.DARK, color: "#303031ff" },
      { name: "orange", class: Theme.ORAGNE, color: "#d17a16ff" },
    ],
  },
};

addDecorator(StyleDecorator);
addDecorator(ThemeDecorator(Theme.LIGHT));
addDecorator(RouterDecorator);
addDecorator(SuspenseDecorator);
