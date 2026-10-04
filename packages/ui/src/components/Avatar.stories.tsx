import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  parameters: { docs: { description: { component: `Render with a \`name\` (initials fallback) or an image \`src\`.

\`\`\`tsx
import { Avatar } from '@readyph/ui';

<Avatar name="Maria Santos" />
<Avatar src="/maria.jpg" name="Maria Santos" size="lg" />
\`\`\`` } } },
  title: 'Components/Data display/Avatar',
  component: Avatar,
  args: { name: 'Maria Santos', size: 'md' },
};
export default meta;
type Story = StoryObj<typeof Avatar>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      <Avatar name="Maria Santos" size="xs" />
      <Avatar name="Maria Santos" size="sm" />
      <Avatar name="Maria Santos" size="md" />
      <Avatar name="Maria Santos" size="lg" />
    </div>
  ),
};

export const WithImage: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar name="Jane Doe" src="https://i.pravatar.cc/80?img=5" />
      <Avatar name="John Lim" src="https://i.pravatar.cc/80?img=12" shape="square" />
      <Avatar name="Broken URL" src="https://invalid.example/x.png" />
    </div>
  ),
};

export const WithStatus: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar name="Online User" status="online" />
      <Avatar name="Busy User" status="busy" />
      <Avatar name="Offline User" status="offline" />
    </div>
  ),
};
