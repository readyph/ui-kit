import type { Meta, StoryObj } from '@storybook/react';
import { DotsThree } from '@phosphor-icons/react';
import { Tooltip } from './Tooltip';
import { Button } from './Button';
import { IconButton } from './IconButton';

const meta: Meta<typeof Tooltip> = {
  parameters: {
    docs: {
      description: {
        component: `A hover/focus tooltip built on Radix Tooltip.

\`\`\`tsx
import { Tooltip, Button } from '@readyph/ui';

<Tooltip content="Create a new item">
  <Button>New</Button>
</Tooltip>
\`\`\``,
      },
    },
  },
  title: 'Components/Overlays/Tooltip',
  component: Tooltip,
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Basic: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip content="Create a new item">
        <Button>Hover me</Button>
      </Tooltip>
      <Tooltip content="More actions" side="right">
        <IconButton icon={DotsThree} label="More" variant="secondary" />
      </Tooltip>
    </div>
  ),
};

export const Sides: Story = {
  render: () => (
    <div className="flex gap-4">
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <Tooltip key={side} content={`On the ${side}`} side={side}>
          <Button variant="secondary">{side}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};
