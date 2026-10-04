import type { Meta, StoryObj } from '@storybook/react';
import { Buildings, Crown, Calendar, Users } from '@phosphor-icons/react';
import { DataList } from './DataList';
import { Badge } from './Badge';

const meta: Meta<typeof DataList> = {
  title: 'Components/Data display/DataList',
  component: DataList,
  parameters: {
    docs: {
      description: {
        component: [
          'A label → value description list for info panels (company details, record metadata). Side-by-side by default; `stacked` for narrow columns.',
          '',
          '```tsx',
          "import { DataList } from '@readyph/ui';",
          "import { Buildings } from '@phosphor-icons/react';",
          '',
          '<DataList',
          '  items={[',
          '    { icon: Buildings, label: "Company", value: "Sunrise Groceries" },',
          '    { label: "Plan", value: "Growth" },',
          '  ]}',
          '/>',
          '```',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof DataList>;

export const Default: Story = {
  render: () => (
    <div className="max-w-sm">
      <DataList
        items={[
          { icon: Buildings, label: 'Company', value: 'Sunrise Groceries' },
          { icon: Crown, label: 'Plan', value: 'Growth' },
          { icon: Calendar, label: 'Created', value: '12 Mar 2025' },
          { icon: Users, label: 'Members', value: <Badge tone="neutral" size="sm">8 of 10</Badge> },
        ]}
      />
    </div>
  ),
};

export const Stacked: Story = {
  render: () => (
    <div className="max-w-xs">
      <DataList
        stacked
        items={[
          { label: 'Email', value: 'maria@readyph.com' },
          { label: 'Phone', value: '(02) 8123 4567' },
          { label: 'Address', value: '12 Mabini St, Makati' },
        ]}
      />
    </div>
  ),
};
