import type { Meta, StoryObj } from '@storybook/react';
import { AvatarGroup } from './AvatarGroup';

const people = [
  { name: 'Maria Santos' },
  { name: 'John Lim' },
  { name: 'Ana Reyes' },
  { name: 'Paolo Cruz' },
  { name: 'Lea Dizon' },
  { name: 'Carlo Tan' },
];

const meta: Meta<typeof AvatarGroup> = {
  title: 'Components/Data display/AvatarGroup',
  component: AvatarGroup,
  args: { people, max: 4, size: 'sm' },
  argTypes: { size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg'] } },
  parameters: {
    docs: {
      description: {
        component: [
          'Overlapping avatars with an overflow "+N" chip.',
          '',
          '```tsx',
          "import { AvatarGroup } from '@readyph/ui';",
          '',
          '<AvatarGroup people={[{ name: "Maria Santos" }, { name: "John Lim" }]} max={4} />',
          '```',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof AvatarGroup>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <AvatarGroup people={people} size="xs" />
      <AvatarGroup people={people} size="sm" />
      <AvatarGroup people={people} size="md" />
    </div>
  ),
};
