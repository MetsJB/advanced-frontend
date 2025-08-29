import { ComponentStory, ComponentMeta } from "@storybook/react";
import AddCommentForm from "./addCommentForm";
import { action } from '@storybook/addon-actions';
import "app/styles/index.scss";
import { StoreDecorator } from "shared/config/storybook/storeDecorator/StoreDecorator";

export default {
  title: "features/AddCommentForm",
  component: AddCommentForm,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof AddCommentForm>;

const Template: ComponentStory<typeof AddCommentForm> = (args) => (
  <AddCommentForm {...args} />
);
console.log()
export const Primary = Template.bind({});
Primary.args = {
  onSendComment: action('onSendComment'),
};

Primary.decorators = [StoreDecorator({
  
})]