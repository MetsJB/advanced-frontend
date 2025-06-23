import { addDecorator } from "@storybook/react";
import { StyleDecorator } from "../../src/shared/config/storybook/styleDecorator/StyleDecorator";
import { ThemeDecorator } from "../../src/shared/config/storybook/themeDecorator/ThemeDecorator";
import { RouterDecorator } from './../../src/shared/config/storybook/routerDecorator/RouterDecorator'
import {Theme} from '../../src/app/providers/ThemeProvider'
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};


addDecorator(StyleDecorator);
addDecorator(ThemeDecorator(Theme.LIGHT));
addDecorator(RouterDecorator);
