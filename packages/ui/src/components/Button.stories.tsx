import type { Meta, StoryObj } from '@storybook/react';
import { FloppyDisk, Plus, ArrowRight, Trash } from '@phosphor-icons/react';
import { Button } from './Button';
import { ShortcutModeProvider } from '../providers/ShortcutModeProvider';

const meta: Meta<typeof Button> = {
  parameters: { docs: { description: { component: `The project owns the behaviour and the label; the package owns the look.

\`\`\`tsx
import { Button } from '@readyph/ui';
import { FloppyDisk } from '@phosphor-icons/react';

<Button onClick={save}>Save</Button>
<Button variant="secondary" leftIcon={FloppyDisk}>Save draft</Button>
\`\`\`` } } },
  title: 'Components/Actions/Button',
  component: Button,
  args: { children: 'Button', variant: 'primary', size: 'md' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'subtle', 'danger'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    leftIcon: { table: { disable: true } },
    rightIcon: { table: { disable: true } },
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="subtle">Subtle</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button leftIcon={Plus}>New item</Button>
      <Button variant="secondary" leftIcon={FloppyDisk}>
        Save
      </Button>
      <Button rightIcon={ArrowRight}>Continue</Button>
      <Button variant="danger" leftIcon={Trash}>
        Delete
      </Button>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button loading>Saving</Button>
      <Button variant="secondary" loading>
        Loading
      </Button>
      <Button disabled>Disabled</Button>
      <Button fullWidth>Full width</Button>
    </div>
  ),
};

export const ShortcutHints: Story = {
  name: 'Shortcut mode',
  render: () => (
    <ShortcutModeProvider defaultOn>
      <div className="flex flex-wrap items-center gap-3">
        <Button leftIcon={FloppyDisk} shortcut="mod+s">
          Save
        </Button>
        <Button variant="secondary" shortcut="mod+k">
          Search
        </Button>
      </div>
      <p className="mt-3 text-xs text-ink-muted">
        Key hints render only while shortcut mode is on. The package shows the affordance; the app binds the key.
      </p>
    </ShortcutModeProvider>
  ),
};
