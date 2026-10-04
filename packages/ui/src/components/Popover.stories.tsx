import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from './Popover';
import { Button } from './Button';

const meta: Meta<typeof Popover> = {
  parameters: {
    docs: {
      description: {
        component: `A click-triggered floating panel built on Radix Popover. The app owns the content.

\`\`\`tsx
import { Popover, Button } from '@readyph/ui';

<Popover trigger={<Button>Open</Button>}>
  {/* panel content */}
</Popover>
\`\`\``,
      },
    },
  },
  title: 'Components/Overlays/Popover',
  component: Popover,
};
export default meta;
type Story = StoryObj<typeof Popover>;

export const Basic: Story = {
  render: () => (
    <Popover trigger={<Button variant="secondary">Open popover</Button>}>
      <h4 className="text-sm font-semibold text-ink">Quick note</h4>
      <p className="mt-1 text-sm text-ink-muted">
        Popovers are click-triggered floating panels. The app owns the content.
      </p>
    </Popover>
  ),
};
