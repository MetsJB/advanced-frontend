import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Select } from './Select';
// eslint-disable-next-line johannesburd-plugin/layer-imports
import '@/app/styles/index.scss';

export default {
    title: 'shared/Select',
    component: Select,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    label: 'укажите значение',
    options: [
        { value: '123', content: '1 пункт' },
        { value: '555', content: '2 пункт' },
        { value: '999', content: '3 пункт' },
    ],
};
