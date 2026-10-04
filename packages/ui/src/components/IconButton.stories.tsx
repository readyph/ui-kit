import type { Meta, StoryObj } from '@storybook/react';
import { Plus, PencilSimple, Trash, DotsThree } from '@phosphor-icons/react';
import { IconButton } from './IconButton';

const meta: Meta<typeof IconButton> = {
  parameters: { docs: { description: { component: `Always pass a \`label\` for accessibility.

\`\`\`tsx
import { IconButton } from '@readyph/ui';
import { Plus } from '@phosphor-icons/react';

<IconButton icon={Plus} label="Add product" onClick={add} />
\`\`\`` } } },
  title: 'Components/Actions/IconButton',
  component: IconButton,
  args: { icon: Plus, label: 'Add', variant: 'subtle', size: 'md' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'subtle', 'danger'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    icon: { table: { disable: true } },
  },
};
export default meta;
type Story = StoryObj<typeof IconButton>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <IconButton icon={Plus} label="Add" variant="primary" />
      <IconButton icon={PencilSimple} label="Edit" variant="secondary" />
      <IconButton icon={DotsThree} label="More" variant="subtle" />
      <IconButton icon={Trash} label="Delete" variant="danger" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <IconButton icon={PencilSimple} label="Edit" size="sm" variant="secondary" />
      <IconButton icon={PencilSimple} label="Edit" size="md" variant="secondary" />
      <IconButton icon={PencilSimple} label="Edit" size="lg" variant="secondary" />
    </div>
  ),
};
