import type { Meta, StoryObj } from '@storybook/react';
import { StatusDot } from './StatusDot';

const meta: Meta<typeof StatusDot> = {
  title: 'Components/Feedback/StatusDot',
  component: StatusDot,
  args: { status: 'active', size: 'md' },
  argTypes: {
    status: { control: 'inline-radio', options: ['active', 'degraded', 'offline', 'neutral'] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
  },
  parameters: {
    docs: {
      description: {
        component: [
          'A small status indicator with an optional live "ping" (on by default for `active`). Add a `label` for text beside it.',
          '',
          '```tsx',
          "import { StatusDot } from '@readyph/ui';",
          '',
          '<StatusDot status="active" />',
          '<StatusDot status="offline" label="Offline" />',
          '```',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof StatusDot>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <StatusDot status="active" label="Active" />
      <StatusDot status="degraded" label="Degraded" />
      <StatusDot status="offline" label="Offline" />
      <StatusDot status="neutral" label="Idle" />
    </div>
  ),
};
