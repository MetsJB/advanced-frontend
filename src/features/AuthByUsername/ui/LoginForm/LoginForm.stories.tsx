import { ComponentStory, ComponentMeta } from "@storybook/react";
import LoginForm  from "./LoginForm";
import "app/styles/index.scss";
import { StoreDecorator } from "shared/config/storybook/storeDecorator/StoreDecorator";

export default {
  title: "features/LoginForm",
  component: LoginForm,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args) => (
  <LoginForm {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};

Primary.decorators = [
  StoreDecorator({
    loginForm: { username: "admin", password: "123"  },
  }),
];

export const withError = Template.bind({});
withError.args = {};

withError.decorators = [
  StoreDecorator({
    loginForm: { username: "admin", password: "123", error:'Error'  },
  }),
];

export const Loading = Template.bind({});
Loading.args = {};

Loading.decorators = [
  StoreDecorator({
    loginForm: { isLoading: true},
  }),
];