import type { Meta, StoryObj } from '@storybook/react';
import { Plus, Export } from '@phosphor-icons/react';
import { PageHeader } from './PageHeader';
import { Breadcrumbs } from './Breadcrumbs';
import { Button } from './Button';

const meta: Meta<typeof PageHeader> = {
  parameters: {
    docs: {
      description: {
        component: `A standalone page header: optional breadcrumbs, title, description and right-aligned actions.

\`\`\`tsx
import { PageHeader, Button } from '@readyph/ui';

<PageHeader title="Inventory" description="128 products" actions={<Button>Add</Button>} />
\`\`\``,
      },
    },
  },
  title: 'Components/Layout/PageHeader',
  component: PageHeader,
};
export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Basic: Story = {
  render: () => (
    <div className="max-w-3xl">
      <PageHeader
        breadcrumbs={<Breadcrumbs items={[{ label: 'Home', href: '#' }, { label: 'Inventory' }]} />}
        title="Inventory"
        description="128 products across 3 branches."
        actions={
          <>
            <Button variant="secondary" leftIcon={Export}>
              Export
            </Button>
            <Button leftIcon={Plus}>Add product</Button>
          </>
        }
      />
    </div>
  ),
};

export const TitleOnly: Story = {
  render: () => (
    <div className="max-w-3xl">
      <PageHeader title="Reports" />
    </div>
  ),
};
