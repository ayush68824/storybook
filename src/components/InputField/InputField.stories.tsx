import type { Meta, StoryObj } from '@storybook/react';
import InputField from './InputField';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    invalid: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
    clearable: {
      control: { type: 'boolean' },
    },
    showPasswordToggle: {
      control: { type: 'boolean' },
    },
    required: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Input Label',
    placeholder: 'Enter text here',
    helperText: 'This is helper text',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Input with Value',
    value: 'Sample text',
    placeholder: 'Enter text here',
  },
};

export const Password: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    showPasswordToggle: true,
    clearable: true,
  },
};

export const Email: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter your email',
    clearable: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'Enter your email',
    value: 'invalid-email',
    invalid: true,
    errorMessage: 'Please enter a valid email address',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    value: 'Disabled value',
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    label: 'Loading Input',
    value: 'Loading...',
    loading: true,
  },
};

export const Required: Story = {
  args: {
    label: 'Required Field',
    placeholder: 'This field is required',
    required: true,
  },
};

export const FilledVariant: Story = {
  args: {
    label: 'Filled Variant',
    placeholder: 'Filled input',
    variant: 'filled',
  },
};

export const GhostVariant: Story = {
  args: {
    label: 'Ghost Variant',
    placeholder: 'Ghost input',
    variant: 'ghost',
  },
};

export const SmallSize: Story = {
  args: {
    label: 'Small Size',
    placeholder: 'Small input',
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    label: 'Large Size',
    placeholder: 'Large input',
    size: 'lg',
  },
};

export const WithClearButton: Story = {
  args: {
    label: 'Clearable Input',
    value: 'Text to clear',
    placeholder: 'Type something to clear',
    clearable: true,
  },
};

export const AllFeatures: Story = {
  args: {
    label: 'Complete Input Field',
    type: 'password',
    placeholder: 'Enter your password',
    value: 'password123',
    helperText: 'Password must be at least 8 characters',
    showPasswordToggle: true,
    clearable: true,
    required: true,
    variant: 'outlined',
    size: 'md',
  },
};
