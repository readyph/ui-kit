import type { Meta, StoryObj } from '@storybook/react';
import { MagnifyingGlass, Package, Plus } from '@phosphor-icons/react';
import { EmptyState } from './EmptyState';
import { Button } from './Button';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/Feedback/EmptyState',
  component: EmptyState,
  parameters: {
    docs: {
      description: {
        component: [
          'A centered placeholder for empty lists, no-results, and first-run states.',
          '',
          '```tsx',
          "import { EmptyState, Button } from '@readyph/ui';",
          "import { Package, Plus } from '@phosphor-icons/react';",
          '',
          '<EmptyState',
          '  icon={Package}',
          '  title="No products yet"',
          '  description="Add your first product or let Leda import them."',
          '  action={<Button leftIcon={Plus}>Add product</Button>}',
          '/>',
          '```',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof EmptyState>;

export const FirstRun: Story = {
  render: () => (
    <div className="max-w-xl rounded-xl border border-border">
      <EmptyState
        icon={Package}
        title="No products yet"
        description="Add your first product, or ask Leda to import them from a spreadsheet."
        action={<Button leftIcon={Plus}>Add product</Button>}
      />
    </div>
  ),
};

export const NoResults: Story = {
  render: () => (
    <div className="max-w-xl rounded-xl border border-border">
      <EmptyState icon={MagnifyingGlass} title="No matches" description="Try a different search term." />
    </div>
  ),
};
