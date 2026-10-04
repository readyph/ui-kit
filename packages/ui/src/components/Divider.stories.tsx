import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Components/Layout/Divider',
  component: Divider,
  parameters: {
    docs: {
      description: {
        component: [
          'A thin separator. Horizontal by default (optionally with a centered label); `vertical` stretches to its row.',
          '',
          '```tsx',
          "import { Divider } from '@readyph/ui';",
          '',
          '<Divider />',
          '<Divider label="or" />',
          '<Divider orientation="vertical" />',
          '```',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof Divider>;

export const Horizontal: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <p className="text-sm text-ink-muted">Section one</p>
      <Divider />
      <p className="text-sm text-ink-muted">Section two</p>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="max-w-md">
      <Divider label="or" />
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-8 items-center gap-4 text-sm text-ink-muted">
      <span>Edit</span>
      <Divider orientation="vertical" />
      <span>Duplicate</span>
      <Divider orientation="vertical" />
      <span>Delete</span>
    </div>
  ),
};
