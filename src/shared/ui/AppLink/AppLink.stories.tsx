import { ComponentStory, ComponentMeta } from "@storybook/react";

import { AppLink, AppLinkTheme } from "./AppLink";
import { ThemeDecorator } from "shared/config/storybook/themeDecorator/ThemeDecorator";
import { Theme } from "app/providers/ThemeProvider";
import "app/styles/index.scss";

export default {
  title: "shared/AppLink",
  component: AppLink,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
} as ComponentMeta<typeof AppLink>;

const Template: ComponentStory<typeof AppLink> = (args) => (
  <AppLink {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  children: "Text",
  theme: AppLinkTheme.PRIMARY,
};
export const Secondary = Template.bind({});
Secondary.args = {
  children: "Text",
  theme: AppLinkTheme.SECONDARY,
};
export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  children: "Text",
  theme: AppLinkTheme.PRIMARY,
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)]
export const SecondaryDark = Template.bind({});
SecondaryDark.args = {
  children: "Text",
  theme: AppLinkTheme.SECONDARY,
};
SecondaryDark.decorators = [ThemeDecorator(Theme.DARK)]


